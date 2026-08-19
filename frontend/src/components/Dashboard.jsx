import { useState } from "react";
import Icon from "./Icon";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import Overview from "../pages/Overview";
import Inventory from "../pages/Inventory";
import Sales from "../pages/Sales";
import Repackaging from "../pages/Repackaging";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import ProductForm from "./forms/ProductForm";
import PurchaseForm from "./forms/PurchaseForm";
import SaleForm from "./forms/SaleForm";
import RepackForm from "./forms/RepackForm";
import ExpenseForm from "./forms/ExpenseForm";

export default function Dashboard({
  user,
  data,
  inventory,
  products,
  purchases,
  sales,
  batches,
  expenses,
  alerts,
  page,
  isDemo,
  busy,
  error,
  onNavigate,
  onRefresh,
  onCreateProduct,
  onCreatePurchase,
  onCreateRepackBatch,
  onRecordSale,
  onCreateExpense,
  onResolveAlert,
  onLogout,
}) {
  const [modal, setModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const firstName = user?.username?.split(" ")[0] || "there";
  const unresolved = alerts.filter((alert) => !alert.resolved);

  const close = () => setModal(null);
  const renderPage = () => {
    switch (page) {
      case "inventory":
        return (
          <Inventory
            inventory={inventory}
            products={products}
            purchases={purchases}
            onAddProduct={() => setModal("product")}
            onAddStock={() => setModal("purchase")}
          />
        );
      case "sales":
        return <Sales sales={sales} onRecordSale={() => setModal("sale")} />;
      case "repack":
        return (
          <Repackaging batches={batches} onRepack={() => setModal("repack")} />
        );
      case "reports":
        return (
          <Reports
            dashboard={data.dashboard}
            sales={sales}
            expenses={expenses}
            inventory={inventory}
          />
        );
      case "settings":
        return <Settings user={user} onLogout={onLogout} />;
      default:
        return <Overview data={data} alerts={alerts} onNavigate={onNavigate} />;
    }
  };

  return (
    <main className="app-shell">
      <button
        className="mobile-menu-button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Open menu"
      >
        <Icon name={sidebarOpen ? "close" : "menu"} size={24} />
      </button>

      <Sidebar
        page={page}
        onNavigate={onNavigate}
        onLogout={onLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <section className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">
              {isDemo ? "DEMO WORKSPACE" : "YOUR SHOP OVERVIEW"}
            </p>
            <h1>Good morning, {firstName}.</h1>
            <p>Here’s what is happening in your shop today.</p>
          </div>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={() => onNavigate("reports")}
              aria-label="Notifications"
            >
              <Icon name="bell" />
              {unresolved.length > 0 && <span className="notification-dot" />}
            </button>
            <div className="avatar">{firstName[0]?.toUpperCase()}</div>
            <button className="add-sale" onClick={() => setModal("sale")}>
              <Icon name="plus" size={18} />
              Record sale
            </button>
          </div>
        </header>
        {isDemo && (
          <p className="demo-banner">
            You are viewing sample data. Sign in to connect this dashboard to
            your own records.
          </p>
        )}
        {error && <div className="inline-error">{error}</div>}
        {busy && <div className="loading-bar">Updating your records...</div>}
        {page === "overview" && (
          <div className="page-actions">
            <button
              className="refresh-button"
              onClick={onRefresh}
              disabled={busy}
            >
              <Icon name="refresh" size={16} /> Refresh data
            </button>
            {unresolved.length > 0 && (
              <button
                className="alert-button"
                onClick={() => onNavigate("reports")}
              >
                <Icon name="bell" size={16} /> {unresolved.length} alert
                {unresolved.length === 1 ? "" : "s"}
              </button>
            )}
          </div>
        )}
        {renderPage()}

        {modal === "product" && (
          <Modal title="Add product" onClose={close}>
            <ProductForm
              busy={busy}
              onSubmit={async (details) => {
                await onCreateProduct(details);
                close();
              }}
            />
          </Modal>
        )}
        {modal === "purchase" && (
          <Modal title="Add bulk stock" onClose={close}>
            <PurchaseForm
              products={products}
              busy={busy}
              onSubmit={async (details) => {
                await onCreatePurchase(details);
                close();
              }}
            />
          </Modal>
        )}
        {modal === "sale" && (
          <Modal title="Record a sale" onClose={close}>
            <SaleForm
              products={products}
              batches={batches}
              busy={busy}
              onSubmit={async (details) => {
                await onRecordSale(details);
                close();
              }}
            />
          </Modal>
        )}
        {modal === "repack" && (
          <Modal title="Create repack batch" onClose={close}>
            <RepackForm
              products={products}
              purchases={purchases}
              busy={busy}
              onSubmit={async (details) => {
                await onCreateRepackBatch(details);
                close();
              }}
            />
          </Modal>
        )}
        {modal === "expense" && (
          <Modal title="Record expense" onClose={close}>
            <ExpenseForm
              products={products}
              busy={busy}
              onSubmit={async (details) => {
                await onCreateExpense(details);
                close();
              }}
            />
          </Modal>
        )}

        {page === "reports" && (
          <div className="floating-expense">
            <button
              className="secondary-button"
              onClick={() => setModal("expense")}
            >
              + Record expense
            </button>
          </div>
        )}
        {unresolved.length > 0 && page === "reports" && (
          <div className="alerts-card card">
            <div className="card-heading">
              <div>
                <h2>Alerts</h2>
                <p>Resolve stock warnings when you've handled them.</p>
              </div>
            </div>
            {unresolved.map((alert) => (
              <div className="alert-row" key={alert._id}>
                <div>
                  <strong>{alert.productId?.name || "Inventory alert"}</strong>
                  <small>{alert.message}</small>
                </div>
                <button
                  className="text-action"
                  onClick={() => onResolveAlert(alert._id)}
                >
                  Resolve
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
