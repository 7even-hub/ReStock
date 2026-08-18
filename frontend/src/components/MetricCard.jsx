import Icon from './Icon'

export default function MetricCard({ icon, label, value, note, positive, warning }) {
  return (
    <article className={`metric-card ${warning ? 'warning' : ''}`}>
      <span className="metric-icon"><Icon name={icon} /></span>
      <p>{label}</p>
      <h2>{value}</h2>
      <small className={positive ? 'positive' : ''}>{positive && <Icon name="arrowUp" size={14} />}{note}</small>
    </article>
  )
}
