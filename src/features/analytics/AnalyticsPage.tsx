import { TrendingUp, Target, CheckCircle2, Clock, BarChart3, PieChart, Activity, Zap } from 'lucide-react';
import { useGoals } from '../../store';
import { Card } from '../../shared/components';

export function AnalyticsPage() {
  const goals = useGoals();

  // Statistics calculations
  const totalGoals = goals.length;
  const activeGoals = goals.filter(g => g.status === 'active').length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  const averageProgress = totalGoals > 0
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals)
    : 0;

  // Priority distribution
  const priorityCount = {
    urgent: goals.filter(g => g.priority === 'urgent').length,
    high: goals.filter(g => g.priority === 'high').length,
    medium: goals.filter(g => g.priority === 'medium').length,
    low: goals.filter(g => g.priority === 'low').length,
  };

  // Time frame distribution
  const timeFrameCount = {
    daily: goals.filter(g => g.timeFrame === 'daily').length,
    weekly: goals.filter(g => g.timeFrame === 'weekly').length,
    monthly: goals.filter(g => g.timeFrame === 'monthly').length,
    yearly: goals.filter(g => g.timeFrame === 'yearly').length,
  };

  // Top 5 goals by progress
  const topGoals = [...goals]
    .filter(g => g.status !== 'completed')
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-900 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-3 mb-3">
          <BarChart3 className="w-10 h-10" />
          <div>
            <h1 className="text-4xl font-bold">통계 분석</h1>
            <p className="text-sm text-blue-100">Analytics & Insights</p>
          </div>
        </div>
        <p className="text-blue-100 text-lg">
          목표 달성 현황과 진행 상황을 한눈에 확인하세요
        </p>
        <p className="text-sm text-blue-200">
          Visualize your progress and gain insights
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Goals */}
        <Card variant="gradient" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {totalGoals}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">총 목표</h3>
          <p className="text-sm text-gray-500">Total Goals</p>
        </Card>

        {/* Active Goals */}
        <Card variant="gradient" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              {activeGoals}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">진행중</h3>
          <p className="text-sm text-gray-500">Active Goals</p>
        </Card>

        {/* Completed Goals */}
        <Card variant="gradient" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              {completedGoals}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">완료됨</h3>
          <p className="text-sm text-gray-500">Completed</p>
        </Card>

        {/* Completion Rate */}
        <Card variant="gradient" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              {completionRate}%
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">완료율</h3>
          <p className="text-sm text-gray-500">Completion Rate</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Priority Distribution */}
        <Card variant="gradient" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">우선순위 분포</h2>
              <p className="text-sm text-gray-500">Priority Distribution</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Urgent */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  긴급 <span className="text-xs text-gray-500">(Urgent)</span>
                </span>
                <span className="text-sm font-bold text-red-600">{priorityCount.urgent}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(priorityCount.urgent / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* High */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  높음 <span className="text-xs text-gray-500">(High)</span>
                </span>
                <span className="text-sm font-bold text-orange-600">{priorityCount.high}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(priorityCount.high / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  보통 <span className="text-xs text-gray-500">(Medium)</span>
                </span>
                <span className="text-sm font-bold text-blue-600">{priorityCount.medium}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(priorityCount.medium / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* Low */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  낮음 <span className="text-xs text-gray-500">(Low)</span>
                </span>
                <span className="text-sm font-bold text-gray-600">{priorityCount.low}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(priorityCount.low / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Time Frame Distribution */}
        <Card variant="gradient" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">기간별 분포</h2>
              <p className="text-sm text-gray-500">Time Frame Distribution</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Daily */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  매일 <span className="text-xs text-gray-500">(Daily)</span>
                </span>
                <span className="text-sm font-bold text-purple-600">{timeFrameCount.daily}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(timeFrameCount.daily / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* Weekly */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  매주 <span className="text-xs text-gray-500">(Weekly)</span>
                </span>
                <span className="text-sm font-bold text-blue-600">{timeFrameCount.weekly}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(timeFrameCount.weekly / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* Monthly */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  매월 <span className="text-xs text-gray-500">(Monthly)</span>
                </span>
                <span className="text-sm font-bold text-green-600">{timeFrameCount.monthly}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(timeFrameCount.monthly / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* Yearly */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  매년 <span className="text-xs text-gray-500">(Yearly)</span>
                </span>
                <span className="text-sm font-bold text-orange-600">{timeFrameCount.yearly}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                  style={{ width: totalGoals > 0 ? `${(timeFrameCount.yearly / totalGoals) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performing Goals */}
      {topGoals.length > 0 && (
        <Card variant="gradient" className="p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-orange-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">진행률 상위 목표</h2>
              <p className="text-sm text-gray-500">Top Performing Goals</p>
            </div>
          </div>

          <div className="space-y-4">
            {topGoals.map((goal, index) => (
              <div key={goal.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {goal.progress}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Average Progress */}
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">전체 평균 진행률</h2>
            <p className="text-sm text-gray-500">Overall Average Progress</p>
          </div>
        </div>

        <div className="relative">
          <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
              style={{ width: `${averageProgress}%` }}
            >
              <span className="text-white font-bold text-sm">{averageProgress}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">시작 <span className="text-xs">(Start)</span></span>
          <span className="text-gray-500">완료 <span className="text-xs">(Complete)</span></span>
        </div>
      </Card>
    </div>
  );
}
