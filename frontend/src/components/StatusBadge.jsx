export default function StatusBadge({ type = 'muted', children }) {
  return <span className={`status-badge ${type}`}>{children}</span>
}
