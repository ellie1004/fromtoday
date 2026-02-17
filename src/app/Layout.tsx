import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  Brain,
  Calendar,
  BarChart3,
  Menu,
  X,
  Sparkles,
  Heart,
  Zap,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../store';

const navigation = [
  { name: '대시보드', nameEn: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: '목표', nameEn: 'Goals', to: '/goals', icon: Target },
  { name: 'AI 멘토', nameEn: 'AI Mentor', to: '/ai-mentor', icon: Brain },
  { name: '캘린더', nameEn: 'Calendar', to: '/calendar', icon: Calendar },
  { name: '분석', nameEn: 'Analytics', to: '/analytics', icon: BarChart3 },
];

export function Layout() {
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const getKoreanDay = (date: Date) => {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getDay()];
  };

  const today = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-blue-50/30">
      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-md"
              onClick={() => setShowAboutModal(false)}
            />

            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
              {/* Animated Background */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>

              {/* Close Button */}
              <button
                onClick={() => setShowAboutModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all hover:scale-110 z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="relative p-12">
                {/* Logo */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 via-orange-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <Sparkles className="w-12 h-12 text-white animate-spin-slow" />
                    </div>
                  </div>
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 bg-clip-text text-transparent mt-6 mb-2">
                    오늘부터
                  </h1>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    FromToday
                  </h2>
                </div>

                {/* Main Message */}
                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-orange-50 via-purple-50 to-blue-50 rounded-2xl p-6 text-center border-2 border-orange-200">
                    <Heart className="w-8 h-8 text-red-500 mx-auto mb-3 animate-pulse" />
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                      당신의 시작을 응원합니다
                    </p>
                    <p className="text-sm text-gray-500">
                      We support your beginning
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center border-2 border-blue-200">
                    <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3 animate-pulse" />
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                      오늘부터와 함께 하세요
                    </p>
                    <p className="text-sm text-gray-500">
                      Join FromToday on your journey
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-orange-500">
                    <Target className="w-6 h-6 text-orange-600 mb-2" />
                    <h3 className="font-bold text-gray-900 mb-1">목표를 작성하세요</h3>
                    <p className="text-xs text-gray-500">Write your goals</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-purple-500">
                    <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                    <h3 className="font-bold text-gray-900 mb-1">진행을 추적하세요</h3>
                    <p className="text-xs text-gray-500">Track your progress</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-blue-500">
                    <Brain className="w-6 h-6 text-blue-600 mb-2" />
                    <h3 className="font-bold text-gray-900 mb-1">AI 멘토와 상담</h3>
                    <p className="text-xs text-gray-500">Consult AI Mentor</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-green-500">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                    <h3 className="font-bold text-gray-900 mb-1">목표를 완주하세요</h3>
                    <p className="text-xs text-gray-500">Complete your goals</p>
                  </div>
                </div>

                {/* Bottom Message */}
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 rounded-2xl p-6 shadow-xl">
                    <Zap className="w-10 h-10 text-white mx-auto mb-3 animate-pulse" />
                    <p className="text-xl font-bold text-white mb-2">
                      오늘은 늘 새로운 날입니다
                    </p>
                    <p className="text-sm text-orange-100 mb-3">
                      Today is always a new day
                    </p>
                    <p className="text-lg font-semibold text-white">
                      오늘부터 시작하세요 ✨
                    </p>
                    <p className="text-xs text-orange-100">
                      Start today, achieve tomorrow
                    </p>
                  </div>
                </div>

                {/* Version */}
                <div className="mt-8 text-center text-sm text-gray-500">
                  <p>FromToday v0.1.0</p>
                  <p className="text-xs">Your Goal Companion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-white via-white to-gray-50 border-r border-gray-200 shadow-xl
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600">
          <button
            onClick={() => setShowAboutModal(true)}
            className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer group"
          >
            <Sparkles className="w-6 h-6 text-white group-hover:animate-spin-slow" />
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-orange-100 transition-colors">
                오늘부터
              </h1>
              <p className="text-xs text-orange-100">FromToday</p>
            </div>
          </button>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:shadow-md'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`${isActive ? '' : 'group-hover:scale-110'} transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {item.nameEn}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50">
          <div className="text-xs text-gray-600 text-center">
            <p className="font-semibold">오늘부터 v0.1.0</p>
            <p className="text-gray-500">FromToday v0.1.0</p>
            <p className="text-gray-500 mt-1">당신의 목표 동반자</p>
            <p className="text-gray-400 text-[10px]">Your Goal Companion</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <div className="text-sm text-right">
                <div className="font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {getKoreanDay(today)}
                </div>
                <div className="text-xs text-gray-600">
                  {today.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 pb-20">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 right-0 left-0 lg:left-64 bg-gradient-to-r from-white/90 via-orange-50/90 to-blue-50/90 backdrop-blur-lg border-t border-gray-200 shadow-lg">
          <div className="px-6 py-3 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-600">
              Designed by
            </span>
            <span className="font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Ellie Kim
            </span>
            <span className="text-sm text-gray-500">
              with
            </span>
            <span className="font-semibold text-blue-900">
              Claude
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
