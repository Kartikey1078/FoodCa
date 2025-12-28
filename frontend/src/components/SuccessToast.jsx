import { useEffect } from "react";

export default function SuccessToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-900 px-5 py-4 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="text-green-600 text-xl">✅</div>

        <div>
          <p className="font-semibold text-sm">Payment Successful</p>
          <p className="text-xs text-green-700 mt-1">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="ml-2 text-green-500 hover:text-green-700 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
