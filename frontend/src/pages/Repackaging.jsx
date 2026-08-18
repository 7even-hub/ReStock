import PageHeading from "../components/PageHeading";
import StatusBadge from "../components/StatusBadge";
import { formatMoney } from "../utils/formatters";

export default function Repackaging({ batches, onRepack }) {
  return (
    <section className="page-content">
      <PageHeading
        title="Repackaging"
        description="Turn bulk inventory into retail-ready units."
        action={
          <button className="primary-button" onClick={onRepack}>
            + New repack batch
          </button>
        }
      />
      <div className="card table-card">
        <div className="data-table">
          <div className="data-table-head">
            <span>Product</span>
            <span>Package</span>
            <span>Cost / unit</span>
            <span>Selling price</span>
            <span>Remaining</span>
            <span>Status</span>
          </div>
          {batches.length ? (
            batches.map((batch) => (
              <div className="data-table-row six" key={batch._id}>
                <span>
                  <strong>{batch.productId?.name || "Product"}</strong>
                </span>
                <span>
                  {batch.packageSize} {batch.packageUnit}
                </span>
                <span>{formatMoney(Number(batch.costPerUnit || 0))}</span>
                <span>{formatMoney(Number(batch.sellingPrice || 0))}</span>
                <span>{batch.remainingUnits}</span>
                <span>
                  <StatusBadge
                    type={batch.status === "active" ? "success" : "muted"}
                  >
                    {batch.status}
                  </StatusBadge>
                </span>
              </div>
            ))
          ) : (
            <p className="empty-state">No repack batches yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
