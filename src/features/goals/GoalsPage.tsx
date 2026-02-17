import { useState } from 'react';
import { Plus, Target as TargetIcon, Sparkles } from 'lucide-react';
import { useGoals } from '../../store';
import { Button } from '../../shared/components';
import { GoalsList } from './components/GoalsList';
import { CreateGoalModal } from './components/CreateGoalModal';

export function GoalsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const goals = useGoals();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="mb-8 bg-gradient-to-r from-orange-500 via-orange-600 to-blue-900 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TargetIcon className="w-8 h-8" />
              <div>
                <h1 className="text-4xl font-bold">목표</h1>
                <p className="text-sm text-orange-100">Goals</p>
              </div>
            </div>
            <p className="text-orange-100 text-lg">
              한 번에 하나씩, 꿈을 이루어가세요
            </p>
            <p className="text-sm text-orange-200">
              Track and achieve your dreams, one goal at a time
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl"
          >
            <div>
              <div className="font-semibold">목표 만들기</div>
              <div className="text-xs">Create Goal</div>
            </div>
          </Button>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <TargetIcon className="w-12 h-12 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
            아직 목표가 없어요
          </h3>
          <p className="text-sm text-gray-500 mb-3">No goals yet</p>
          <p className="text-gray-600 mb-2 text-lg">
            첫 번째 목표를 만들어 여정을 시작하세요
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Start your journey by creating your first goal
          </p>
          <Button
            size="lg"
            leftIcon={<Sparkles className="w-5 h-5" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            첫 목표 만들기
          </Button>
        </div>
      ) : (
        <GoalsList />
      )}

      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
