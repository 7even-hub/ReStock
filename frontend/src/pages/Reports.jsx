import PageHeading from "../components/PageHeading";
import MetricCard from "../components/MetricCard";
import { formatMoney } from "../utils/formatters";

const icons = {
  revenue: "mdi:cash-plus",
  grossProfit: "mdi:trending-up",
  expenses: "mdi:cash-minus",
  netProfit: "mdi:cash-check",
};

// eslint-disable-next-line no-unused-vars
const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export default function Reports({ dashboard, sales, expenses, inventory }) {
  const revenue = sales.reduce(
    (sum, sale) => sum + Number(sale.totalAmount || 0),
    0,
  );
  const profit = sales.reduce((sum, sale) => sum + Number(sale.profit || 0), 0);
  const expenseTotal = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0,
  );
  const net = profit - expenseTotal;
  const days = dashboard.salesLast7Days || [];
  const max = Math.max(...days.map((day) => Number(day.sales || 0)), 1);

  return (
    <section className="page-content">
      <PageHeading
        title="Reports"
        description="A quick look at your shop's financial and stock performance."
      />
      <div className="metric-grid">
        <MetricCard
          icon={icons.revenue}
          label="Revenue"
          value={formatMoney(Number(revenue || 0))}
          note="Recorded sales"
        />
        <MetricCard
          icon={icons.grossProfit}
          label="Gross profit"
          value={formatMoney(Number(profit || 0))}
          note="Before expenses"
          positive
        />
        <MetricCard
          icon={icons.expenses}
          label="Expenses"
          value={formatMoney(Number(expenseTotal || 0))}
          note="Recorded expenses"
        />
        <MetricCard
          icon={icons.netProfit}
          label="Net profit"
          value={formatMoney(Number(net || 0))}
          note="Profit after expenses"
          positive={net >= 0}
          warning={net < 0}
        />
      </div>
      <div className="dashboard-grid">
        <article className="card">
          <div className="card-heading">
            <div>
              <h2>Inventory position</h2>
              <p>Current stock across your shop.</p>
            </div>
          </div>
          <div className="report-stat">
            <span>Retail units</span>
            <strong>
              {inventory.reduce(
                (sum, item) => sum + Number(item.repackRemaining || 0),
                0,
              )}
            </strong>
          </div>
          <div className="report-stat">
            <span>Bulk stock</span>
            <strong>
              {inventory.reduce(
                (sum, item) => sum + Number(item.bulkRemaining || 0),
                0,
              )}
            </strong>
          </div>
          <div className="report-stat">
            <span>Products</span>
            <strong>{inventory.length}</strong>
          </div>
        </article>
        <article className="card">
          <div className="card-heading">
            <div>
              <h2>Daily performance</h2>
              <p>Revenue from the last seven days.</p>
            </div>
          </div>
          <div className="report-chart">
            {days.map((day) => (
              <div className="report-chart-row" key={day.date}>
                <span>{day.label || day.date}</span>
                <div>
                  <span
                    style={{
                      width: `${(Number(day.sales || 0) / max) * 100}%`,
                    }}
                  />
                </div>
                <strong>{formatMoney(Number(day.sales || 0))}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
