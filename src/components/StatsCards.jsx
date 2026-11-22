import Icon from './Icon.jsx';

// All numbers come from `stats`, which is calculated from the task list.
export default function StatsCards({ stats }) {
  const cards = [
    { key: 'total', icon: 'tasks', label: 'Total tasks', value: stats.total, note: 'Across all projects' },
    { key: 'progress', icon: 'clock', label: 'In progress', value: stats.inProgress, note: 'Keep the momentum' },
    { key: 'done', icon: 'done', label: 'Completed', value: stats.completed, note: `${stats.percent}% of all tasks` },
  ];
  return (
    <section className="stats" aria-label="Overview statistics">
      {cards.map((c) => (
        <article key={c.key} className={`stat stat--${c.key}`}>
          <span className="stat__icon"><Icon name={c.icon} size={18} /></span>
          <div>
            <p className="stat__label">{c.label}</p>
            <p className="stat__value">{c.value}</p>
            <p className="stat__note">{c.note}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
