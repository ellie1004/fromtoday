// AI service (Anthropic Claude integration)
import Anthropic from '@anthropic-ai/sdk';
import type { AIMentorMessage, Goal } from '../../shared/types';

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

if (!apiKey) {
  console.warn('VITE_ANTHROPIC_API_KEY is not set in environment variables');
}

const anthropic = new Anthropic({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
});

export interface ChatOptions {
  goal?: Goal;
  context?: string;
  maxTokens?: number;
}

export class AIService {
  private model = 'claude-3-5-sonnet-20241022';

  async chat(
    messages: AIMentorMessage[],
    options: ChatOptions = {}
  ): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(options);

      const response = await anthropic.messages.create({
        model: this.model,
        max_tokens: options.maxTokens || 1024,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const content = response.content[0];
      if (content.type === 'text') {
        return content.text;
      }

      throw new Error('Unexpected response type from Claude');
    } catch (error) {
      console.error('AI Service error:', error);
      throw error;
    }
  }

  async streamChat(
    messages: AIMentorMessage[],
    onChunk: (text: string) => void,
    options: ChatOptions = {}
  ): Promise<void> {
    try {
      const systemPrompt = this.buildSystemPrompt(options);

      const stream = await anthropic.messages.create({
        model: this.model,
        max_tokens: options.maxTokens || 1024,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
      });

      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          onChunk(event.delta.text);
        }
      }
    } catch (error) {
      console.error('AI Service streaming error:', error);
      throw error;
    }
  }

  async getGoalSuggestions(goalTitle: string): Promise<string[]> {
    try {
      const response = await anthropic.messages.create({
        model: this.model,
        max_tokens: 512,
        system:
          'You are a helpful AI mentor that provides actionable suggestions for achieving goals. Provide 3-5 specific, actionable steps.',
        messages: [
          {
            role: 'user',
            content: `I want to achieve this goal: "${goalTitle}". Give me 3-5 specific, actionable steps to get started. Format each step as a bullet point.`,
          },
        ],
      });

      const content = response.content[0];
      if (content.type === 'text') {
        // Parse bullet points from response
        const suggestions = content.text
          .split('\n')
          .filter((line) => line.trim().startsWith('-') || line.trim().startsWith('•'))
          .map((line) => line.replace(/^[-•]\s*/, '').trim())
          .filter(Boolean);

        return suggestions;
      }

      return [];
    } catch (error) {
      console.error('Error getting goal suggestions:', error);
      return [];
    }
  }

  async analyzeGoalProgress(goal: Goal, context?: string): Promise<string> {
    try {
      const response = await anthropic.messages.create({
        model: this.model,
        max_tokens: 1024,
        system:
          'You are an encouraging AI mentor that provides insightful analysis and motivation for goal achievement.',
        messages: [
          {
            role: 'user',
            content: `
Analyze my progress on this goal:
- Title: ${goal.title}
- Description: ${goal.description || 'N/A'}
- Priority: ${goal.priority}
- Progress: ${goal.progress}%
- Status: ${goal.status}
- Start Date: ${goal.startDate}
- Target Date: ${goal.targetDate || 'Not set'}

${context ? `Additional context: ${context}` : ''}

Provide encouraging feedback and actionable suggestions to help me make progress.
            `.trim(),
          },
        ],
      });

      const content = response.content[0];
      if (content.type === 'text') {
        return content.text;
      }

      return 'Unable to analyze progress at this time.';
    } catch (error) {
      console.error('Error analyzing goal progress:', error);
      return 'Unable to analyze progress at this time.';
    }
  }

  private buildSystemPrompt(options: ChatOptions): string {
    let prompt = `You are an encouraging and insightful AI mentor helping users achieve their goals.
You provide:
- Actionable advice and specific steps
- Encouragement and motivation
- Help with breaking down large goals into manageable tasks
- Strategies for overcoming obstacles
- Time management and productivity tips

Keep responses concise, friendly, and focused on helping the user make progress.`;

    if (options.goal) {
      prompt += `\n\nCurrent goal context:
- Title: ${options.goal.title}
- Description: ${options.goal.description || 'N/A'}
- Priority: ${options.goal.priority}
- Progress: ${options.goal.progress}%
- Status: ${options.goal.status}`;
    }

    if (options.context) {
      prompt += `\n\nAdditional context: ${options.context}`;
    }

    return prompt;
  }
}

// Export singleton instance
export const aiService = new AIService();
