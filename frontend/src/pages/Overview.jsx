import MetricCard from '../components/MetricCard'
import {formatMoney} from '../utils/formatters'

// eslint-disable-next-line no-unused-vars
const money = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })
const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }) : '—'

export default function Overview({ data, alerts = [], onNavigate }) {
  const dashboard = data.dashboard || {}
  const today = dashboard.today || {}
  const inventory = dashboard.inventory || {}
  const days = dashboard.salesLast7Days || []
  const lowStock = dashboard.lowStockProducts || []
  const recentSales = dashboard.recentSales || []
  const maxSales = Math.max(...days.map((item) => Number(item.sales || 0)), 1)
  const weekSales = days.reduce((total, day) => total + Number(day.sales || 0), 0)

  return <>
    <section className="metric-grid">
      <MetricCard icon="chart" label="Sales today" value={formatMoney(today.sales || 0)} note={`${today.transactions || 0} transactions`} />
      <MetricCard icon="arrowUp" label="Profit today" value={formatMoney(today.profit || 0)} note="From today's sales" positive />
      <MetricCard icon="box" label="Retail items left" value={Number(inventory.repackRemaining || 0).toLocaleString()} note={`${inventory.productCount || 0} products in stock`} />
      <MetricCard icon="bell" label="Needs attention" value={inventory.lowStockCount || 0} note={`${alerts.filter((a) => !a.resolved).length || inventory.unresolvedAlertCount || 0} unresolved alerts`} warning />
    </section>

    <section className="dashboard-grid">
      <article className="card sales-card">
        <div className="card-heading"><div><h2>Sales this week</h2><p>Daily revenue over the last 7 days</p></div><strong>{formatMoney(weekSales)}</strong></div>
        <div className="chart-bars">{days.map((day) => <div className="bar-column" key={day.date}><span className="bar-value">{formatMoney(day.sales)}</span><div className="bar-track"><span style={{ height: `${Math.max(8, (Number(day.sales || 0) / maxSales) * 100)}%` }} /></div><small>{day.label || day.date.slice(5)}</small></div>)}</div>
      </article>

      <article className="card stock-card">
        <div className="card-heading"><div><h2>Low-stock items</h2><p>Restock these products soon.</p></div><button className="text-action" onClick={() => onNavigate('inventory')}>View inventory</button></div>
        {lowStock.length ? <div className="stock-list">{lowStock.map((product) => <div className="stock-row" key={product.productId}><span className="product-badge">{product.name?.[0] || '?'}</span><div><strong>{product.name}</strong><small>{product.category || 'General'}</small></div><span className="stock-count">{product.repackRemaining} left</span></div>)}</div> : <Empty label="Your stock levels look good." />}
      </article>

      <article className="card recent-card">
        <div className="card-heading"><div><h2>Recent sales</h2><p>Your latest transactions.</p></div><button className="text-action" onClick={() => onNavigate('sales')}>View all sales</button></div>
        {recentSales.length ? <div className="sales-table"><div className="table-head"><span>Product</span><span>Quantity</span><span>Amount</span></div>{recentSales.map((sale) => <div className="table-row" key={sale._id}><span><strong>{sale.productId?.name || sale.productName || 'Product sale'}</strong><small>{formatDate(sale.saleDate)}</small></span><span>{sale.quantitySold}</span><strong>{formatMoney(Number(sale.totalAmount || 0))}</strong></div>)}</div> : <Empty label="Your recorded sales will appear here." />}
      </article>
    </section>
  </>
}

function Empty({ label }) { return <p className="empty-state">{label}</p> }
