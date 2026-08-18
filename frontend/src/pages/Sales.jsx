import PageHeading from "../components/PageHeading";
import MetricCard from "../components/MetricCard";
import { formatMoney } from "../utils/formatters";

const icons = {
  totalRevenue: "mdi:cash-multiple",
  totalProfit: "mdi:trending-up",
};

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

export default function Sales({ sales, onRecordSale }) {
  const revenue = sales.reduce(
    (sum, sale) => sum + Number(sale.totalAmount || 0),
    0,
  );
  const profit = sales.reduce((sum, sale) => sum + Number(sale.profit || 0), 0);
  return (
    <section className="page-content">
      <PageHeading
        title="Sales"
        description="Record and review your retail transactions."
        action={
          <button className="primary-button" onClick={onRecordSale}>
            + Record sale
          </button>
        }
      />
      <div className="metric-grid compact">
        <MetricCard
          icon={icons.totalRevenue}
          label="Total revenue"
          value={formatMoney(Number(revenue || 0))}
          note={`${sales.length} transactions`}
        />
        <MetricCard
          icon={icons.totalProfit}
          label="Total profit"
          value={formatMoney(Number(profit || 0))}
          note="Gross profit"
          positive
        />
      </div>
      <div className="card table-card">
        <div className="data-table">
          <div className="data-table-head">
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
            <span>Date</span>
          </div>
          {sales.length ? (
            sales.map((sale) => (
              <div className="data-table-row" key={sale._id}>
                <span>
                  <strong>{sale.productId?.name || "Product"}</strong>
                </span>
                <span>{sale.quantitySold}</span>
                <span>{formatMoney(Number(sale.sellingPrice || 0))}</span>
                <strong>{formatMoney(Number(sale.totalAmount || 0))}</strong>
                <span>{date(sale.saleDate)}</span>
              </div>
            ))
          ) : (
            <p className="empty-state">No sales recorded yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
