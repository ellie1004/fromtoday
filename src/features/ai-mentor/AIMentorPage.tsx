import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Loader2 } from 'lucide-react';
import { useUserName, useGoals } from '../../store';
import { Button } from '../../shared/components';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIMentorPage() {
  const userName = useUserName();
  const goals = useGoals();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 초기 인사 메시지
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: userName
            ? `${userName}님, 반가워요! 👋\n\n저는 오늘부터의 AI 멘토예요. 목표 달성을 위해 언제든 조언이나 격려가 필요하시면 말씀해주세요!`
            : '안녕하세요! 👋\n\n저는 오늘부터의 AI 멘토예요. 목표 달성을 위해 언제든 도와드릴게요!',
          timestamp: new Date(),
        },
      ]);
    }
  }, [userName, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // API 호출
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          goals: goals.map((g) => ({
            title: g.title,
            progress: g.progress,
            status: g.status,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('API 오류');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '죄송해요, 일시적인 오류가 발생했어요. 다시 시도해주세요! 🙏',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="mb-4 bg-gradient-to-r from-purple-500 via-purple-600 to-blue-900 rounded-2xl p-6 shadow-2xl text-white">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 animate-pulse" />
          <div>
            <h1 className="text-3xl font-bold">
              {userName ? `${userName}님의 AI 멘토` : 'AI 멘토'}
            </h1>
            <p className="text-sm text-purple-100">
              {userName ? `Hello ${userName}, I'm your AI Mentor` : 'Your AI Mentor'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800 border-2 border-purple-200'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-600">AI 멘토</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 border-2 border-purple-200">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                  <span className="text-sm text-purple-600">AI 멘토가 생각하고 있어요...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="AI 멘토에게 질문하거나 조언을 구해보세요... 💭"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* 제안 질문들 */}
        {messages.length === 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setInput('오늘 할 일을 어떻게 시작하면 좋을까요?')}
              className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm rounded-full transition-colors border border-purple-200"
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              오늘 할 일 조언
            </button>
            <button
              onClick={() => setInput('목표를 달성하기 위한 팁을 알려주세요')}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-full transition-colors border border-blue-200"
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              목표 달성 팁
            </button>
            <button
              onClick={() => setInput('동기부여가 필요해요')}
              className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 text-sm rounded-full transition-colors border border-pink-200"
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              동기 부여
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
