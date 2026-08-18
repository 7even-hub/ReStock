import Icon from './Icon'

const items = [
  ['dashboard', 'Overview', 'overview'],
  ['box', 'Inventory', 'inventory'],
  ['cart', 'Sales', 'sales'],
  ['package', 'Repackaging', 'repack'],
  ['chart', 'Reports', 'reports'],
]

export default function Sidebar({ page, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <button className="brand brand-button" onClick={() => onNavigate('overview')}>
      <img src="public/main-logo.svg" alt="" /> 
      </button>
      <nav>
        {items.map(([icon, label, target]) => (
          <button key={target} className={`nav-item ${page === target ? 'active' : ''}`} onClick={() => onNavigate(target)}>
            <Icon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item" onClick={() => onNavigate('settings')}>
          <Icon name="settings" />
          <span>Settings</span>
        </button>
        <button className="nav-item" onClick={onLogout}>
          <Icon name="logout" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
