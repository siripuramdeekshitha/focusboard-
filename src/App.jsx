import { useMemo, useState } from 'react';
import { useTasks } from './context/TaskContext.jsx';
import { filterTasks, getStats } from './utils/tasks.js';
import Sidebar from './components/Sidebar.jsx';
import MobileNav from './components/MobileNav.jsx';
import Header from './components/Header.jsx';
import FocusNotesCarousel from './components/FocusNotesCarousel.jsx';
import StatsCards from './components/StatsCards.jsx';
import TaskToolbar from './components/TaskToolbar.jsx';
import TaskList from './components/TaskList.jsx';
import TaskFormModal from './components/TaskFormModal.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import Icon from './components/Icon.jsx';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, setStatus } = useTasks();

  // UI state (filters + dialogs). Task data itself lives in the context.
  const [query, setQuery] = useState('');
  const [status, setStatusFilter] = useState('all');
  const [priority, setPriority] = useState('all');
  const [form, setForm] = useState(null); // null | { task?: Task }
  const [toDelete, setToDelete] = useState(null);
  const [activeNav, setActiveNav] = useState('overview');

  // Derived values - recalculated from state on every render, never stored.
  const stats = useMemo(() => getStats(tasks), [tasks]);
  const visible = useMemo(() => filterTasks(tasks, { query, status, priority }), [tasks, query, status, priority]);

  const clearFilters = () => { setQuery(''); setStatusFilter('all'); setPriority('all'); };

  const handleSave = (values) => {
    if (form?.task) updateTask(form.task.id, values);
    else addTask({ ...values, category: 'General' });
    setForm(null);
  };

  const handleNavigate = (id) => {
    setActiveNav(id);
    if (id === 'tasks') document.getElementById('my-tasks')?.scrollIntoView({ behavior: 'smooth' });
    if (id === 'overview') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />

      <div className="app__main">
        <Header />

        <main className="content">
          <div className="page-head">
            <div>
              <h1>Your work, in focus.</h1>
              <p>Plan your day, stay organized, and celebrate small wins.</p>
            </div>
            <button type="button" className="btn btn--primary page-head__btn" onClick={() => setForm({})}>New task</button>
          </div>

          <FocusNotesCarousel />
          <StatsCards stats={stats} />

          <section id="my-tasks" className="tasks" aria-labelledby="tasks-title">
            <div className="tasks__head">
              <div>
                <h2 id="tasks-title">My tasks</h2>
                <p>Manage and track everything in one place.</p>
              </div>
              <button type="button" className="btn btn--soft tasks__all" onClick={clearFilters}>View all tasks</button>
              <button type="button" className="btn btn--primary btn--icon tasks__add" onClick={() => setForm({})} aria-label="New task">
                <Icon name="plus" size={18} />
              </button>
            </div>

            <TaskToolbar
              query={query} onQuery={setQuery}
              status={status} onStatus={setStatusFilter}
              priority={priority} onPriority={setPriority}
              totalCount={tasks.length}
            />

            <p className="sr-only" role="status">{visible.length} tasks shown</p>
            <TaskList
              tasks={visible}
              hasAnyTasks={tasks.length > 0}
              onEdit={(task) => setForm({ task })}
              onDelete={setToDelete}
              onStatus={setStatus}
              onClearFilters={clearFilters}
              onNew={() => setForm({})}
            />
          </section>
        </main>
      </div>

      <MobileNav active={activeNav} onNavigate={handleNavigate} />

      {form && <TaskFormModal task={form.task} onSave={handleSave} onClose={() => setForm(null)} />}
      {toDelete && (
        <ConfirmDialog
          title="Delete this task?"
          message={`"${toDelete.title}" will be removed permanently. This can't be undone.`}
          confirmLabel="Delete task"
          onCancel={() => setToDelete(null)}
          onConfirm={() => { deleteTask(toDelete.id); setToDelete(null); }}
        />
      )}
    </div>
  );
}
