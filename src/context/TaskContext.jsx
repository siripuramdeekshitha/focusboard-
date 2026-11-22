import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { sampleTasks } from '../data/sampleTasks.js';
import { makeId } from '../utils/tasks.js';

const STORAGE_KEY = 'focusboard.tasks.v1';

// Sample data is used ONLY when nothing valid has been saved.
// An empty saved array still counts as "saved", so deleting everything sticks.
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* storage blocked or corrupted - fall back to samples */
  }
  return sampleTasks;
}

// Pure reducer: every case returns a NEW array, never mutates state.
function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.values, id: makeId() }, ...state];
    case 'UPDATE':
      return state.map((t) => (t.id === action.id ? { ...t, ...action.values } : t));
    case 'DELETE':
      return state.filter((t) => t.id !== action.id);
    case 'SET_STATUS':
      return state.map((t) => (t.id === action.id ? { ...t, status: action.status } : t));
    default:
      return state;
  }
}

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      addTask: (values) => dispatch({ type: 'ADD', values }),
      updateTask: (id, values) => dispatch({ type: 'UPDATE', id, values }),
      deleteTask: (id) => dispatch({ type: 'DELETE', id }),
      setStatus: (id, status) => dispatch({ type: 'SET_STATUS', id, status }),
    }),
    [tasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside <TaskProvider>');
  return ctx;
}
