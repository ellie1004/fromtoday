import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useStore } from '../../../store';
import { Button } from '../../../shared/components';
import type { GoalPriority, TimeFrame } from '../../../shared/types';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGoalModal({ isOpen, onClose }: CreateGoalModalProps) {
  const navigate = useNavigate();
  const addGoal = useStore((state) => state.addGoal);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<GoalPriority>('medium');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('monthly');
  const [targetDate, setTargetDate] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addGoal({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      startDate: new Date().toISOString(),
      targetDate: targetDate || undefined,
      timeFrame,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setTimeFrame('monthly');
    setTargetDate('');
    setTags('');

    onClose();

    // Navigate to dashboard
    navigate('/dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600">
            <div>
              <h2 className="text-xl font-semibold text-white">
                새 목표 만들기
              </h2>
              <p className="text-xs text-orange-100">Create New Goal</p>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                목표 날짜 (선택사항) <span className="text-xs text-gray-500">Target Date (Optional)</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
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
                목표 생성 <span className="text-xs opacity-80">Create Goal</span>
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
