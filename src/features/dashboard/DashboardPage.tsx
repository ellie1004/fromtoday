import { useState, useEffect } from 'react';
import { useGoals, useUserName, useStore } from '../../store';
import { Card, CardHeader, CardBody, Button } from '../../shared/components';
import { Target, TrendingUp, Clock, Award, Plus, MessageCircle, Calendar as CalendarIcon, BarChart3, Sparkles, User, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();
  const goals = useGoals();
  const userName = useUserName();
  const setUserName = useStore((state) => state.setUserName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');
  const averageProgress =
    goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
      : 0;

  useEffect(() => {
    if (!userName) {
      setIsEditingName(true);
    }
  }, [userName]);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditingName(false);
      setTempName('');
    }
  };

  const stats = [
    {
      label: '전체 목표',
      labelEn: 'Total Goals',
      value: goals.length,
      icon: Target,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      label: '진행 중',
      labelEn: 'Active Goals',
      value: activeGoals.length,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: '완료됨',
      labelEn: 'Completed',
      value: completedGoals.length,
      icon: Award,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: '평균 진행률',
      labelEn: 'Avg. Progress',
      value: `${averageProgress}%`,
      icon: Clock,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome & Name Input Modal */}
      {isEditingName && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-md" />

            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>

              <div className="relative p-10">
                {/* Logo/Icon */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 via-orange-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
                    </div>
                  </div>
                </div>

                {/* Welcome Text */}
                {!userName ? (
                  <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 bg-clip-text text-transparent mb-3 animate-fade-in">
                      오늘부터
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      FromToday
                    </h2>
                    <div className="space-y-2 mb-6">
                      <p className="text-xl font-semibold text-gray-700">
                        오늘은 늘 새로운 날입니다
                      </p>
                      <p className="text-sm text-gray-500">
                        Today is always a new day
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 via-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-bold text-orange-600">오늘부터</span> 당신의 목표를<br />
                        <span className="font-bold text-purple-600">끝까지 완주</span>하세요
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Achieve your goals starting today
                      </p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      당신을 뭐라고 부르면 될까요?
                    </p>
                    <p className="text-sm text-gray-500">
                      What should we call you?
                    </p>
                  </div>
                ) : (
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      이름 변경
                    </h2>
                    <p className="text-sm text-gray-500">
                      Change Your Name
                    </p>
                    <p className="text-gray-600 mt-2">
                      새로운 이름을 입력해주세요
                    </p>
                  </div>
                )}

                {/* Name Input */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all text-center text-xl font-semibold bg-white/80 backdrop-blur-sm"
                    placeholder="이름을 입력하세요"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                    autoFocus
                  />
                  {tempName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveName}
                    disabled={!tempName.trim()}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      tempName.trim()
                        ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 text-white shadow-xl hover:shadow-2xl'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {userName ? (
                      <>
                        변경하기
                        <span className="text-sm block opacity-80">Change</span>
                      </>
                    ) : (
                      <>
                        🚀 시작하기
                        <span className="text-sm block opacity-80">Start Your Journey</span>
                      </>
                    )}
                  </button>
                  {userName && (
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setTempName('');
                      }}
                      className="flex-1 py-4 rounded-2xl font-bold text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      취소
                      <span className="text-sm block opacity-60">Cancel</span>
                    </button>
                  )}
                </div>

                {/* Bottom decoration */}
                {!userName && (
                  <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Target className="w-4 h-4" />
                      <span>목표 관리</span>
                      <span className="text-gray-300">•</span>
                      <TrendingUp className="w-4 h-4" />
                      <span>진행률 추적</span>
                      <span className="text-gray-300">•</span>
                      <Bot className="w-4 h-4" />
                      <span>AI 멘토</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header with Gradient */}
      <div className="mb-8 bg-gradient-to-r from-orange-500 via-orange-600 to-blue-900 rounded-2xl p-8 shadow-2xl text-white relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 animate-pulse" />
            <div>
              <h1 className="text-4xl font-bold">
                {userName ? `${userName}님 반가워요!` : '다시 오셨군요!'}
              </h1>
              <p className="text-sm text-orange-100">
                {userName ? `Hello, ${userName}!` : 'Welcome Back!'}
              </p>
            </div>
          </div>
          {userName && (
            <button
              onClick={() => {
                setTempName(userName);
                setIsEditingName(true);
              }}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title="이름 변경 (Change name)"
            >
              <User className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-orange-100 text-lg">
          멋진 진전을 이루고 있어요! 이 기세를 유지하세요.
        </p>
        <p className="text-sm text-orange-200">
          You're making great progress! Keep up the momentum.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} variant="elevated" hover>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.labelEn}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mt-2`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.bgGradient} shadow-lg transform transition-transform hover:scale-110`}>
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Goals */}
        <Card variant="gradient" hover>
          <CardHeader
            title="최근 목표"
            gradient
            action={
              <Button size="sm" variant="primary" onClick={() => navigate('/goals')}>
                전체보기
              </Button>
            }
          />
          <CardBody>
            {goals.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-gray-900 font-medium mb-1">아직 목표가 없어요</p>
                <p className="text-sm text-gray-500 mb-4">첫 목표를 만들어보세요!</p>
                <p className="text-xs text-gray-400">No goals yet. Create your first goal!</p>
                <Button className="mt-4" onClick={() => navigate('/goals')} leftIcon={<Plus className="w-5 h-5" />}>
                  목표 만들기
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {goals.slice(0, 5).map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-orange-200 cursor-pointer"
                    onClick={() => navigate('/goals')}
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-500 capitalize">{goal.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        {goal.progress}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card variant="gradient" hover>
          <CardHeader title="빠른 실행" gradient />
          <CardBody>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/goals')}
                className="w-full text-left p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">새 목표 만들기</div>
                  <div className="text-xs text-orange-100">Create New Goal</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/ai-mentor')}
                className="w-full text-left p-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">AI 멘토와 대화</div>
                  <div className="text-xs text-blue-200">Chat with AI Mentor</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/calendar')}
                className="w-full text-left p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">캘린더 보기</div>
                  <div className="text-xs text-green-100">View Calendar</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="w-full text-left p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">분석 확인</div>
                  <div className="text-xs text-purple-100">Check Analytics</div>
                </div>
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
