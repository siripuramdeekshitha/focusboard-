import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

const EMPTY = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' };

// A native <dialog> gives us a focus trap, Esc-to-close and a backdrop for free.
export default function TaskFormModal({ task, onSave, onClose }) {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const isEdit = Boolean(task);
  const [values, setValues] = useState(
    task ? { title: task.title, description: task.description, status: task.status, priority: task.priority, dueDate: task.dueDate } : EMPTY
  );
  const [error, setError] = useState('');

  useEffect(() => {
    const el = dialogRef.current;
    if (el && !el.open) el.showModal();
    titleRef.current?.focus();
  }, []);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (field === 'title') setError('');
  };

  const submit = (e) => {
    e.preventDefault();
    const title = values.title.trim();
    if (!title) {
      setError('Please enter a task title.');
      titleRef.current?.focus();
      return;
    }
    if (title.length > 80) {
      setError('Keep the title under 80 characters.');
      titleRef.current?.focus();
      return;
    }
    onSave({ ...values, title, description: values.description.trim() });
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="task-form-title"
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
    >
      <form className="modal__card" onSubmit={submit} noValidate>
        <div className="modal__head">
          <div>
            <h2 id="task-form-title">{isEdit ? 'Edit task' : 'Create new task'}</h2>
            <p>{isEdit ? 'Update the details for this task.' : 'Add your task details to stay on top of your day.'}</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close form"><Icon name="close" size={16} /></button>
        </div>

        <div className="field">
          <label htmlFor="f-title">Task title <span aria-hidden="true">*</span></label>
          <input
            id="f-title"
            ref={titleRef}
            type="text"
            placeholder="e.g. Finalize landing page"
            value={values.title}
            onChange={set('title')}
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'f-title-error' : undefined}
            className={error ? 'has-error' : ''}
          />
          {error && <p id="f-title-error" className="field__error" role="alert">{error}</p>}
        </div>

        <div className="field">
          <label htmlFor="f-desc">Description</label>
          <textarea id="f-desc" rows="3" placeholder="Add notes about this task..." value={values.description} onChange={set('description')} />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="f-status">Status</label>
            <select id="f-status" value={values.status} onChange={set('status')}>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-priority">Priority</label>
            <select id="f-priority" value={values.priority} onChange={set('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="f-date">Due date</label>
          <input id="f-date" type="date" value={values.dueDate} onChange={set('dueDate')} />
        </div>

        <p className="required-note">* Required field</p>

        <div className="modal__actions">
          <button type="button" className="btn btn--outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary">{isEdit ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </dialog>
  );
}
