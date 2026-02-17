import { useState } from 'react';
import { Calendar, Tag, TrendingUp, Edit2, Trash2, MoreVertical } from 'lucide-react';
import type { Goal } from '../../../shared/types';
import { useStore, useSubGoalsByGoalId } from '../../../store';
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  ProgressBar,
} from '../../../shared/components';
import {
  formatDate,
  formatRelativeTime,
} from '../../../shared/utils';
import { EditGoalModal } from './EditGoalModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const subGoals = useSubGoalsByGoalId(goal.id);
  const deleteGoal = useStore((state) => state.deleteGoal);
  const completedSubGoals = subGoals.filter((sg) => sg.completed).length;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'paused':
        return 'warning';
      case 'active':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      default:
        return 'default';
    }
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low':
        return '낮음';
      case 'medium':
        return '보통';
      case 'high':
        return '높음';
      case 'urgent':
        return '긴급';
      default:
        return priority;
    }
  };

  const handleDelete = () => {
    deleteGoal(goal.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Card variant="gradient" hover className="relative group">
        {/* Action Menu */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-1 z-20">
              <button
                onClick={() => {
                  setIsEditModalOpen(true);
                  setShowActions(false);
                }}
                className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 transition-colors text-gray-700 hover:text-orange-600"
              >
                <Edit2 className="w-4 h-4" />
                <div>
                  <span className="font-medium block">목표 수정</span>
                  <span className="text-xs text-gray-500">Edit Goal</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setShowActions(false);
                }}
                className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-colors text-gray-700 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                <div>
                  <span className="font-medium block">목표 삭제</span>
                  <span className="text-xs text-gray-500">Delete Goal</span>
                </div>
              </button>
            </div>
          )}
        </div>

        <CardHeader
          title={goal.title}
          subtitle={goal.description}
          gradient
          action={
            <div className="flex gap-2">
              <Badge variant={getStatusVariant(goal.status)} size="sm">
                {getStatusLabel(goal.status)}
              </Badge>
              <Badge variant={getPriorityVariant(goal.priority)} size="sm">
                {getPriorityLabel(goal.priority)}
              </Badge>
            </div>
          }
        />

        <CardBody>
          <div className="space-y-4">
            {/* Progress with Icon */}
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <ProgressBar value={goal.progress} showLabel gradient size="md" />
              </div>
            </div>

            {/* Sub-goals count */}
            {subGoals.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div>
                  <span className="text-sm font-semibold text-blue-800">
                    {completedSubGoals} / {subGoals.length} 작업 완료
                  </span>
                  <span className="text-xs text-blue-600 ml-1">
                    (tasks completed)
                  </span>
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">시작일 <span className="text-[10px]">(Started)</span></div>
                  <div className="text-sm font-semibold text-gray-700">
                    {formatRelativeTime(goal.startDate)}
                  </div>
                </div>
              </div>
              {goal.targetDate && (
                <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg border border-orange-100">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <div>
                    <div className="text-xs text-orange-600">마감일 <span className="text-[10px]">(Due)</span></div>
                    <div className="text-sm font-semibold text-orange-700">
                      {formatDate(goal.targetDate, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {goal.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                {goal.tags.map((tag) => (
                  <Badge key={tag} variant="primary" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Modals */}
      <EditGoalModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        goal={goal}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        goalTitle={goal.title}
      />
    </>
  );
}
