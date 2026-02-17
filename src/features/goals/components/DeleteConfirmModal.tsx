import { AlertTriangle } from 'lucide-react';
import { Button } from '../../../shared/components';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  goalTitle: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  goalTitle,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-900/50 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-900 mb-1">
              목표를 삭제하시겠습니까?
            </h2>
            <p className="text-xs text-center text-gray-500 mb-3">Delete Goal?</p>

            <p className="text-gray-700 text-center mb-2">
              정말로 <span className="font-bold text-gray-900">"{goalTitle}"</span>를 삭제하시겠습니까?
            </p>
            <p className="text-sm text-gray-500 text-center mb-6">
              이 작업은 되돌릴 수 없습니다.<br />
              <span className="text-xs">(This action cannot be undone.)</span>
            </p>

            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={onConfirm}
                className="flex-1"
              >
                삭제 <span className="text-xs opacity-80">Delete</span>
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                취소 <span className="text-xs opacity-80">Cancel</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
