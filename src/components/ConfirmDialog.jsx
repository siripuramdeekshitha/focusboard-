import { useEffect, useRef } from 'react';

export default function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className="modal modal--small"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-msg"
      onCancel={(e) => { e.preventDefault(); onCancel(); }}
      onClick={(e) => { if (e.target === ref.current) onCancel(); }}
    >
      <div className="modal__card">
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-msg" className="confirm__msg">{message}</p>
        <div className="modal__actions">
          <button type="button" className="btn btn--outline" onClick={onCancel} autoFocus>Cancel</button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </dialog>
  );
}
