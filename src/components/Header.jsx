import Icon from './Icon.jsx';
import { Logo } from './Sidebar.jsx';

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar__logo"><Logo /></div>
      <p className="breadcrumb">
        <span>Workspace</span>
        <Icon name="right" size={12} />
        <strong>Overview</strong>
      </p>
      <button type="button" className="avatar-btn" aria-label="Account menu (placeholder)">
        <span className="avatar">JS</span>
        <Icon name="down" size={14} />
      </button>
    </header>
  );
}
