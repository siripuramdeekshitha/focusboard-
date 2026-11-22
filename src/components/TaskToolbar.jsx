import Icon from './Icon.jsx';

const TABS = [
  { id: 'all', label: 'All tasks' },
  { id: 'todo', label: 'To do' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
];

export default function TaskToolbar({ query, onQuery, status, onStatus, priority, onPriority, totalCount }) {
  return (
    <div className="toolbar">
      <div className="tabs" role="group" aria-label="Filter by status">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tab ${status === t.id ? 'is-active' : ''}`}
            aria-pressed={status === t.id}
            onClick={() => onStatus(t.id)}
          >
            {t.label}
            {t.id === 'all' && <span className="tab__count">{totalCount}</span>}
          </button>
        ))}
      </div>

      <div className="toolbar__right">
        <label className="search">
          <span className="sr-only">Search tasks by title</span>
          <Icon name="search" size={16} />
          <input type="search" placeholder="Find a task..." value={query} onChange={(e) => onQuery(e.target.value)} />
        </label>

        <label className="select select--priority">
          <span className="select__prefix">Priority:</span>
          <span className="sr-only">Filter by priority</span>
          <select value={priority} onChange={(e) => onPriority(e.target.value)}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <Icon name="down" size={14} className="select__chevron" />
        </label>
      </div>
    </div>
  );
}
