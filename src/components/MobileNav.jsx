import Icon from './Icon.jsx';
import { NAV_ITEMS } from './Sidebar.jsx';

// Bottom tab bar shown on small screens (touch targets >= 48px tall).
export default function MobileNav({ active, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Main">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`mobile-nav__item ${active === item.id ? 'is-active' : ''}`}
          aria-current={active === item.id ? 'page' : undefined}
          onClick={() => onNavigate(item.id)}
        >
          <Icon name={item.icon} size={20} />
          <span>{item.id === 'tasks' ? 'Tasks' : item.label}</span>
        </button>
      ))}
    </nav>
  );
}
