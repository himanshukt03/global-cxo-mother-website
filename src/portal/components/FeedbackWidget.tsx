import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/portal/api/client';

interface FeedbackWidgetProps {
  showFloatingButton?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FeedbackWidget({
  showFloatingButton = true,
  open: externalOpen,
  onOpenChange,
}: FeedbackWidgetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    setSubmitting(true);
    try {
      await apiFetch('/feedback', {
        method: 'POST',
        body: { category, message: message.trim(), page_url: window.location.pathname },
      });
      toast.success('Thank you for your feedback!');
      setOpen(false);
      setMessage('');
      setCategory('general');
    } catch {
      toast.error('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {showFloatingButton && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
          title="Send feedback"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:items-end sm:justify-end p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm sm:backdrop-blur-none"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl border p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Send Feedback
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Help us improve Global CXO Circle
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="question">Question</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={4}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting || !message.trim()}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Sending...' : 'Submit Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
