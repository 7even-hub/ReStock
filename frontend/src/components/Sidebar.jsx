import { Icon } from "@iconify/react";

const items = [
  ["mdi:view-dashboard-outline", "Overview", "overview"],
  ["mdi:package-variant-closed", "Inventory", "inventory"],
  ["mdi:cart-outline", "Sales", "sales"],
  ["mdi:package-variant", "Repackaging", "repack"],
  ["mdi:chart-line", "Reports", "reports"],
];

export default function Sidebar({
  page,
  onNavigate,
  onLogout,
  open,
  onClose,
}) {
  const navigate = (target) => {
    onNavigate(target);
    onClose();
  };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button
          className="brand brand-button"
          onClick={() => navigate("overview")}
        >
          <img className="logo-full" src="/main-logo.svg" alt="ReStock" />
          {/* <img className="logo-mobile" src="/mobile-logo.svg" alt="ReStock" /> */}
        </button>

        <nav>
          {items.map(([icon, label, target]) => (
            <button
              key={target}
              className={`nav-item ${page === target ? "active" : ""}`}
              onClick={() => navigate(target)}
            >
              <Icon icon={icon} width={24} height={24} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => navigate("settings")}
          >
            <Icon icon="mdi:cog-outline" width={24} height={24} />
            <span>Settings</span>
          </button>

          <button className="nav-item" onClick={onLogout}>
            <Icon icon="mdi:logout" width={24} height={24} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}