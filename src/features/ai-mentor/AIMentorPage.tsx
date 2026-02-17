import { Bot, Sparkles, MessageCircle, Target, TrendingUp, Zap } from 'lucide-react';
import { useUserName } from '../../store';

export function AIMentorPage() {
  const userName = useUserName();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="mb-8 bg-gradient-to-r from-purple-500 via-purple-600 to-blue-900 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-3 mb-3">
          <Bot className="w-10 h-10 animate-pulse" />
          <div>
            <h1 className="text-4xl font-bold">
              {userName ? `${userName}님, AI 멘토입니다` : 'AI 멘토'}
            </h1>
            <p className="text-sm text-purple-100">
              {userName ? `Hello ${userName}, I'm your AI Mentor` : 'AI Mentor'}
            </p>
          </div>
        </div>
        <p className="text-purple-100 text-lg">
          {userName ? `${userName}님의 목표 달성을 위한 똑똑한 파트너` : '당신의 목표 달성을 위한 똑똑한 파트너'}
        </p>
        <p className="text-sm text-purple-200">
          Your smart partner for achieving goals
        </p>
      </div>

      {/* Main Content */}
      <div className="relative min-h-[600px] bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-2xl p-12 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

        {/* Central AI Icon */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-purple-300 opacity-30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-blue-300 opacity-20 animate-ping delay-500"></div>

            {/* Main icon - Cute AI Robot */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <Bot className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Floating Speech Bubbles */}
        <div className="relative space-y-8">
          {/* Bubble 1 - Top Left */}
          <div className="absolute -top-4 left-0 animate-float">
            <div className="relative bg-white rounded-2xl p-4 shadow-xl max-w-xs border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">목표 관리</p>
                  <p className="text-sm text-gray-600">
                    사용자의 목표를 체계적으로 관리해드립니다
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Organize your goals systematically</p>
                </div>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45 border-l-4 border-purple-500"></div>
            </div>
          </div>

          {/* Bubble 2 - Top Right */}
          <div className="absolute -top-4 right-0 animate-float delay-300">
            <div className="relative bg-white rounded-2xl p-4 shadow-xl max-w-xs border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">진행 상황 분석</p>
                  <p className="text-sm text-gray-600">
                    실시간으로 진척도를 분석하고 피드백을 드립니다
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Real-time progress analysis</p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-l-4 border-blue-500"></div>
            </div>
          </div>

          {/* Bubble 3 - Middle Left */}
          <div className="absolute top-40 left-8 animate-float delay-600">
            <div className="relative bg-white rounded-2xl p-4 shadow-xl max-w-xs border-l-4 border-pink-500">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">맞춤형 조언</p>
                  <p className="text-sm text-gray-600">
                    당신에게 딱 맞는 실행 가능한 조언을 제공합니다
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Personalized actionable advice</p>
                </div>
              </div>
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45 border-l-4 border-pink-500"></div>
            </div>
          </div>

          {/* Bubble 4 - Middle Right */}
          <div className="absolute top-40 right-8 animate-float delay-900">
            <div className="relative bg-white rounded-2xl p-4 shadow-xl max-w-xs border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">동기 부여</p>
                  <p className="text-sm text-gray-600">
                    포기하지 않도록 지속적으로 응원하고 격려합니다
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Continuous motivation & support</p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-l-4 border-green-500"></div>
            </div>
          </div>
        </div>

        {/* Central Message */}
        <div className="relative z-10 text-center mt-96 pt-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-purple-200 max-w-2xl mx-auto">
            <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-spin-slow" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {userName ? `${userName}님, AI 멘토가 함께합니다` : 'AI 멘토가 함께합니다'}
            </h2>
            <p className="text-lg text-gray-700 mb-2 leading-relaxed">
              {userName ? (
                <>
                  <span className="font-bold text-purple-600">{userName}님</span>의 <span className="font-bold text-purple-600">목표를 관리</span>해주고<br />
                  목표를 <span className="font-bold text-blue-600">끝까지 완주</span>할 수 있도록<br />
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AI 멘토가 도와드립니다
                  </span>
                </>
              ) : (
                <>
                  사용자의 <span className="font-bold text-purple-600">목표를 관리</span>해주고<br />
                  목표를 <span className="font-bold text-blue-600">끝까지 완주</span>할 수 있도록<br />
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AI 멘토가 도와드립니다
                  </span>
                </>
              )}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              AI Mentor helps you manage your goals and supports you to complete them until the end
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">곧 만나요!</span>
              <span className="text-sm opacity-90">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
