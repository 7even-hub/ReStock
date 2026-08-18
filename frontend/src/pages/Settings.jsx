import PageHeading from "../components/PageHeading";

export default function Settings({ user, onLogout }) {
  return (
    <section className="page-content settings-page">
      <PageHeading
        title="Settings"
        description="Manage your StockSplit workspace."
      />
      <div className="card settings-card">
        <div>
          <p className="eyebrow">ACCOUNT</p>
          <h2>{user?.shopName || "Your shop"}</h2>
          <p>{user?.username || "Account owner"}</p>
        </div>
        <button className="secondary-button" onClick={onLogout}>
          Sign out
        </button>
      </div>
      <div className="card">
        <p className="eyebrow">ABOUT</p>
        <h2>StockSplit</h2>
        <p className="muted">
          Bulk-to-retail inventory management for mini marts and provision
          stores.
        </p>
      </div>
    </section>
  );
}
