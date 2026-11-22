import TaskRow from './TaskRow.jsx';

export default function TaskList({ tasks, hasAnyTasks, onEdit, onDelete, onStatus, onClearFilters, onNew }) {
  if (tasks.length === 0) {
    return (
      <div className="empty" role="status">
        {hasAnyTasks ? (
          <>
            <p className="empty__title">No tasks match your filters</p>
            <p>Try a different search or clear the filters.</p>
            <button type="button" className="btn btn--soft" onClick={onClearFilters}>Clear filters</button>
          </>
        ) : (
          <>
            <p className="empty__title">Nothing here yet</p>
            <p>Add your first task to start planning your day.</p>
            <button type="button" className="btn btn--primary" onClick={onNew}>New task</button>
          </>
        )}
      </div>
    );
  }
  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskRow key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} />
      ))}
    </ul>
  );
}
