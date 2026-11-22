import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { PRIORITY_LABELS, STATUS_LABELS, formatDueDate } from '../utils/tasks.js';

function RowMenu({ task, onEdit, onDelete, onStatus }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const run = (fn) => () => { setOpen(false); fn(); };
  const otherStatuses = Object.keys(STATUS_LABELS).filter((s) => s !== task.status);

  return (
    <div className="row-menu" ref={wrapRef}>
      <button
        type="button"
        className="icon-btn"
        aria-label={`Actions for ${task.title}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="dots" size={18} />
      </button>
      {open && (
        <ul className="menu" role="menu">
          <li role="none"><button role="menuitem" type="button" onClick={run(() => onEdit(task))}>Edit task</button></li>
          {otherStatuses.map((s) => (
            <li role="none" key={s}>
              <button role="menuitem" type="button" onClick={run(() => onStatus(task.id, s))}>Mark as {STATUS_LABELS[s]}</button>
            </li>
          ))}
          <li role="none"><button role="menuitem" type="button" className="danger" onClick={run(() => onDelete(task))}>Delete</button></li>
        </ul>
      )}
    </div>
  );
}

export default function TaskRow({ task, onEdit, onDelete, onStatus }) {
  const done = task.status === 'completed';
  // Clicking the circle toggles between Completed and To do.
  const toggle = () => onStatus(task.id, done ? 'todo' : 'completed');

  return (
    <li className={`task ${done ? 'is-done' : ''}`}>
      <button
        type="button"
        className={`status-btn status-btn--${task.status}`}
        onClick={toggle}
        aria-label={`${done ? 'Mark as to do' : 'Mark as completed'}: ${task.title}`}
      >
        {done && <Icon name="check" size={13} />}
      </button>

      <div className="task__main">
        <p className="task__title">{task.title}</p>
        <p className="task__desc">{task.description}</p>
        <span className="sr-only">Status: {STATUS_LABELS[task.status]}</span>
      </div>

      <div className="task__meta">
        <span className={`badge badge--cat badge--${task.category.toLowerCase()}`}>{task.category}</span>
        <span className={`badge badge--${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
        <span className="task__date"><Icon name="calendar" size={14} />{formatDueDate(task.dueDate)}</span>
      </div>

      <RowMenu task={task} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} />
    </li>
  );
}
