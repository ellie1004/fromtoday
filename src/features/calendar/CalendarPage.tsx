import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useGoals } from '../../store';
import { Card, Badge } from '../../shared/components';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const goals = useGoals();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = monthStart.getDay();

  // Create array of empty cells for padding
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getGoalsForDate = (date: Date) => {
    return goals.filter(goal => {
      if (!goal.targetDate) return false;
      try {
        const targetDate = parseISO(goal.targetDate);
        return isSameDay(targetDate, date);
      } catch {
        return false;
      }
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return '진행중';
      case 'completed':
        return '완료';
      case 'paused':
        return '일시정지';
      case 'archived':
        return '보관됨';
      default:
        return status;
    }
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-green-500 via-green-600 to-blue-900 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CalendarIcon className="w-8 h-8" />
              <div>
                <h1 className="text-4xl font-bold">캘린더</h1>
                <p className="text-sm text-green-100">Calendar</p>
              </div>
            </div>
            <p className="text-green-100 text-lg">
              목표와 마일스톤을 달력에서 확인하세요
            </p>
            <p className="text-sm text-green-200">
              View your goals and milestones in a calendar view
            </p>
          </div>
        </div>
      </div>

      <Card variant="gradient" className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
            >
              오늘
            </button>
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Week day headers */}
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`text-center py-2 font-semibold text-sm ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}

          {/* Empty cells for padding */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {daysInMonth.map((day) => {
            const dayGoals = getGoalsForDate(day);
            const isCurrentDay = isToday(day);
            const hasGoals = dayGoals.length > 0;

            return (
              <div
                key={day.toISOString()}
                className={`
                  aspect-square p-2 rounded-xl border-2 transition-all duration-200
                  ${isCurrentDay
                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg'
                    : hasGoals
                      ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="h-full flex flex-col">
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      isCurrentDay
                        ? 'text-green-700'
                        : day.getDay() === 0
                          ? 'text-red-500'
                          : day.getDay() === 6
                            ? 'text-blue-500'
                            : 'text-gray-700'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>

                  {/* Goals for this day */}
                  <div className="flex-1 space-y-1 overflow-hidden">
                    {dayGoals.slice(0, 3).map((goal) => (
                      <div
                        key={goal.id}
                        className="text-xs px-2 py-1 bg-white rounded shadow-sm truncate border-l-2 border-orange-500"
                        title={goal.title}
                      >
                        {goal.title}
                      </div>
                    ))}
                    {dayGoals.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayGoals.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500"></div>
            <span className="text-sm text-gray-600">오늘 (Today)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200"></div>
            <span className="text-sm text-gray-600">목표 있음 (Has Goals)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-gray-200"></div>
            <span className="text-sm text-gray-600">일반 날짜 (Regular Day)</span>
          </div>
        </div>
      </Card>

      {/* Goals Summary */}
      {goals.filter(g => g.targetDate).length > 0 && (
        <Card variant="gradient" className="mt-6 p-6">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
            목표 마감일
          </h3>
          <p className="text-sm text-gray-500 mb-4">Goal Deadlines</p>
          <div className="space-y-3">
            {goals
              .filter(g => g.targetDate)
              .sort((a, b) => {
                if (!a.targetDate || !b.targetDate) return 0;
                return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
              })
              .map(goal => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-500">
                      {goal.targetDate && format(parseISO(goal.targetDate), 'yyyy년 M월 d일', { locale: ko })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        goal.status === 'completed'
                          ? 'success'
                          : goal.status === 'paused'
                            ? 'warning'
                            : 'info'
                      }
                      size="sm"
                    >
                      {getStatusLabel(goal.status)}
                    </Badge>
                    <span className="text-sm font-bold text-orange-600">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
}
