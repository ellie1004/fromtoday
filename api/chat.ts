import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, goals } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Anthropic API 호출
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: `당신은 "오늘부터(FromToday)" 앱의 AI 멘토입니다. 사용자의 목표 달성을 돕는 친절하고 격려하는 멘토 역할을 합니다.

역할:
- 목표 달성을 위한 구체적이고 실행 가능한 조언 제공
- 동기 부여와 격려
- 진행 상황에 대한 긍정적 피드백
- 한국어로 대화하며, 친근하고 따뜻한 말투 사용

사용자의 현재 목표들:
${goals && goals.length > 0 ? goals.map((g: any) => `- ${g.title} (진행률: ${g.progress}%)`).join('\n') : '아직 목표가 없습니다.'}

항상 짧고 명확하게 답변하세요 (2-3문장).`,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return res.status(response.status).json({ error: 'AI 응답 오류' });
    }

    const data = await response.json();
    const aiMessage = data.content[0].text;

    return res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
