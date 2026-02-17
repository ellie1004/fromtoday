import { useGoals } from '../../../store';
import { GoalCard } from './GoalCard';
import { Target, Clock, CheckCircle2 } from 'lucide-react';

export function GoalsList() {
  const goals = useGoals();

  // Group goals by status
  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');
  const pausedGoals = goals.filter((g) => g.status === 'paused');

  return (
    <div className="space-y-8">
      {activeGoals.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-gradient-to-r from-orange-500 to-orange-600">
            <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                진행 중인 목표
              </h2>
              <p className="text-sm text-gray-500">Active Goals</p>
            </div>
            <span className="ml-auto px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-bold">
              {activeGoals.length}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {activeGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      )}

      {pausedGoals.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2">
            <div className="p-2 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                일시 중단된 목표
              </h2>
              <p className="text-sm text-gray-500">Paused Goals</p>
            </div>
            <span className="ml-auto px-3 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 rounded-full text-sm font-bold">
              {pausedGoals.length}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {pausedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      )}

      {completedGoals.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2">
            <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                완료된 목표
              </h2>
              <p className="text-sm text-gray-500">Completed Goals</p>
            </div>
            <span className="ml-auto px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full text-sm font-bold">
              {completedGoals.length}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {completedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
