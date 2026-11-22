// Seed data. Only used when nothing has been saved in localStorage yet.
// status: 'todo' | 'in-progress' | 'completed'   priority: 'low' | 'medium' | 'high'
export const sampleTasks = [
  { id: 't1', title: 'Design landing page', description: 'Website redesign · Due soon', category: 'Design', status: 'in-progress', priority: 'high', dueDate: '2026-11-22' },
  { id: 't2', title: 'Fix mobile navigation', description: 'Frontend sprint · UI polish', category: 'Development', status: 'in-progress', priority: 'medium', dueDate: '2026-11-24' },
  { id: 't3', title: 'Review onboarding copy', description: 'Content updates · Approved', category: 'Content', status: 'completed', priority: 'low', dueDate: '2026-11-18' },
  { id: 't4', title: 'Set up analytics events', description: 'Track sign-ups and key clicks', category: 'Development', status: 'todo', priority: 'medium', dueDate: '2026-11-27' },
  { id: 't5', title: 'Create icon set', description: 'Consistent 24px outline icons', category: 'Design', status: 'completed', priority: 'low', dueDate: '2026-11-15' },
  { id: 't6', title: 'Write release notes', description: 'Summarise changes for v1.2', category: 'Content', status: 'todo', priority: 'low', dueDate: '2026-11-30' },
  { id: 't7', title: 'Audit colour contrast', description: 'Check text against WCAG AA', category: 'Design', status: 'in-progress', priority: 'high', dueDate: '2026-11-25' },
  { id: 't8', title: 'Refactor task API helpers', description: 'Remove duplicated fetch code', category: 'Development', status: 'completed', priority: 'medium', dueDate: '2026-11-12' },
  { id: 't9', title: 'Plan weekly team sync', description: 'Agenda and shared notes', category: 'Content', status: 'completed', priority: 'low', dueDate: '2026-11-10' },
  { id: 't10', title: 'Update brand guidelines', description: 'Add new colour and type tokens', category: 'Design', status: 'in-progress', priority: 'medium', dueDate: '2026-11-28' },
  { id: 't11', title: 'Fix form validation bugs', description: 'Edge cases on date inputs', category: 'Development', status: 'todo', priority: 'high', dueDate: '2026-11-23' },
  { id: 't12', title: 'Publish help centre article', description: 'Getting started guide', category: 'Content', status: 'completed', priority: 'medium', dueDate: '2026-11-14' },
];
