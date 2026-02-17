import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useStore } from '../../../store';
import { Button } from '../../../shared/components';
import type { Goal, GoalPriority, TimeFrame, GoalStatus } from '../../../shared/types';

interface EditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal;
}

export function EditGoalModal({ isOpen, onClose, goal }: EditGoalModalProps) {
  const navigate = useNavigate();
  const updateGoal = useStore((state) => state.updateGoal);
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description || '');
  const [priority, setPriority] = useState<GoalPriority>(goal.priority);
  const [status, setStatus] = useState<GoalStatus>(goal.status);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(goal.timeFrame);
  const [targetDate, setTargetDate] = useState(
    goal.targetDate ? goal.targetDate.split('T')[0] : ''
  );
  const [tags, setTags] = useState(goal.tags.join(', '));
  const [progress, setProgress] = useState(goal.progress);

  // Update form when goal changes
  useEffect(() => {
    setTitle(goal.title);
    setDescription(goal.description || '');
    setPriority(goal.priority);
    setStatus(goal.status);
    setTimeFrame(goal.timeFrame);
    setTargetDate(goal.targetDate ? goal.targetDate.split('T')[0] : '');
    setTags(goal.tags.join(', '));
    setProgress(goal.progress);
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    updateGoal({
      id: goal.id,
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status,
      timeFrame,
      targetDate: targetDate || undefined,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      progress,
    });

    onClose();

    // Navigate to dashboard
    navigate('/dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-900/50 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600">
            <div>
              <h2 className="text-xl font-semibold text-white">
                목표 수정
              </h2>
              <p className="text-xs text-orange-100">Edit Goal</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                목표 제목 <span className="text-xs text-gray-500">Goal Title</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="예: TypeScript 배우기 (e.g., Learn TypeScript)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명 <span className="text-xs text-gray-500">Description</span>
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
                placeholder="목표에 대해 설명해주세요... (Describe your goal...)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상태 <span className="text-xs text-gray-500">Status</span>
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as GoalStatus)}
                >
                  <option value="active">진행중 (Active)</option>
                  <option value="paused">일시정지 (Paused)</option>
                  <option value="completed">완료 (Completed)</option>
                  <option value="archived">보관됨 (Archived)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  우선순위 <span className="text-xs text-gray-500">Priority</span>
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as GoalPriority)}
                >
                  <option value="low">낮음 (Low)</option>
                  <option value="medium">보통 (Medium)</option>
                  <option value="high">높음 (High)</option>
                  <option value="urgent">긴급 (Urgent)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기간 <span className="text-xs text-gray-500">Time Frame</span>
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
                >
                  <option value="daily">매일 (Daily)</option>
                  <option value="weekly">매주 (Weekly)</option>
                  <option value="monthly">매월 (Monthly)</option>
                  <option value="yearly">매년 (Yearly)</option>
                  <option value="custom">맞춤 (Custom)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  목표 날짜 <span className="text-xs text-gray-500">Target Date</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                진행률 <span className="text-xs text-gray-500">Progress</span>: {progress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                태그 (쉼표로 구분) <span className="text-xs text-gray-500">Tags (comma-separated)</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="예: 학습, 프로그래밍, 커리어 (e.g., learning, programming, career)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">쉼표로 태그를 구분하세요 (Separate tags with commas)</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                변경사항 저장 <span className="text-xs opacity-80">Save Changes</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                취소 <span className="text-xs opacity-80">Cancel</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
