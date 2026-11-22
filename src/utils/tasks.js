export const STATUS_LABELS = { todo: 'To do', 'in-progress': 'In progress', completed: 'Completed' };
export const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

// Everything shown in the stat cards is calculated from the task list.
export function getStats(tasks) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, inProgress, completed, percent };
}

// Search, status tab and priority filter all work together.
export function filterTasks(tasks, { query, status, priority }) {
  const q = query.trim().toLowerCase();
  return tasks.filter((t) => {
    if (q && !t.title.toLowerCase().includes(q)) return false;
    if (status !== 'all' && t.status !== status) return false;
    if (priority !== 'all' && t.priority !== priority) return false;
    return true;
  });
}

// '2026-11-22' -> 'Nov 22' (parsed by hand so time zones can't shift the day)
export function formatDueDate(iso) {
  if (!iso) return 'No date';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `t-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
