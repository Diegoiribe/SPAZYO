import { useState, useEffect } from 'react';

export const showToast = (message) => {
  window.dispatchEvent(new CustomEvent('api-error', { detail: message }));
};

export const Toast = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer;

    const handler = (e) => {
      setMessage(e.detail);
      setVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), 4000);
    };

    window.addEventListener('api-error', handler);
    return () => {
      window.removeEventListener('api-error', handler);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-72">
      <div className="flex items-center justify-center gap-4 px-4 py-4 text-xs font-medium text-neutral-600 rounded-2xl bg-neutral-100">
        <span>{message}</span>
      </div>
    </div>
  );
};
