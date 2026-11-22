import Icon from './Icon.jsx';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'tasks', label: 'My tasks', icon: 'list' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export function Logo() {
  return (
    <div className="logo">
      <span className="logo__mark"><Icon name="grid" size={16} /></span>
      <span className="logo__text">FocusBoard</span>
    </div>
  );
}

// Desktop / tablet sidebar. Overview + My tasks work; Calendar + Settings are
// visual placeholders (documented in README).
export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <Logo />
      <nav aria-label="Main">
        <p className="sidebar__heading">Workspace</p>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-item ${active === item.id ? 'is-active' : ''}`}
                aria-current={active === item.id ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
