import { useMemo, useState } from "react";
import PageHeading from "../components/PageHeading";
import StatusBadge from "../components/StatusBadge";
import {formatMoney} from "../utils/formatters";

// eslint-disable-next-line no-unused-vars
const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
const date = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-NG", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

export default function Inventory({
  inventory,
  // eslint-disable-next-line no-unused-vars
  products,
  purchases,
  onAddProduct,
  onAddStock,
}) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      inventory.filter((item) =>
        (item.productId?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [inventory, search],
  );

  return (
    <section className="page-content">
      <PageHeading
        title="Inventory"
        description="Track bulk stock and repackaged retail units."
        action={
          <button className="primary-button" onClick={onAddProduct}>
            + Add product
          </button>
        }
      />
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="secondary-button" onClick={onAddStock}>
          Add bulk stock
        </button>
      </div>
      <div className="card table-card">
        <div className="data-table">
          <div className="data-table-head">
            <span>Product</span>
            <span>Category</span>
            <span>Bulk stock</span>
            <span>Retail units</span>
            <span>Status</span>
          </div>
          {filtered.length ? (
            filtered.map((item) => {
              const product = item.productId || {};
              const low =
                Number(item.repackRemaining || 0) <=
                Number(product.lowStockLimit || 0);
              return (
                <div className="data-table-row" key={item._id}>
                  <span>
                    <strong>{product.name || "Unknown product"}</strong>
                  </span>
                  <span>{product.category || "General"}</span>
                  <span>
                    {item.bulkRemaining || 0} {item.bulkUnit || ""}
                  </span>
                  <span>{item.repackRemaining || 0}</span>
                  <span>
                    <StatusBadge type={low ? "warning" : "success"}>
                      {low ? "Low stock" : "In stock"}
                    </StatusBadge>
                  </span>
                </div>
              );
            })
          ) : (
            <Empty label="No inventory records found." />
          )}
        </div>
      </div>
      <div className="card">
        <div className="card-heading">
          <div>
            <h2>Recent bulk purchases</h2>
            <p>Stock you've added to the shop.</p>
          </div>
        </div>
        {purchases.length ? (
          <div className="purchase-list">
            {purchases.slice(0, 8).map((purchase) => (
              <div className="purchase-row" key={purchase._id}>
                <div>
                  <strong>{purchase.productId?.name || "Product"}</strong>
                  <small>{date(purchase.purchaseDate)}</small>
                </div>
                <span>
                  {purchase.actualWeight ?? purchase.weight}{" "}
                  {purchase.weightUnit}
                </span>
                <strong>{formatMoney(purchase.totalCost || 0)}</strong>
              </div>
            ))}
          </div>
        ) : (
          <Empty label="No bulk purchases recorded yet." />
        )}
      </div>
    </section>
  );
}

function Empty({ label }) {
  return <p className="empty-state">{label}</p>;
}
