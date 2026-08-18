import { Icon } from "@iconify/react";

export default function MetricCard({
  icon,
  label,
  value,
  note,
  positive,
  warning,
}) {
  return (
    <article className={`metric-card ${warning ? "warning" : ""}`}>
      <span className="metric-icon">
        <Icon icon={icon} width={24} height={24} />
      </span>
      <p>{label}</p>
      <h2>{value}</h2>
      <small className={positive ? "positive" : ""}>
        {positive && <Icon icon="mdi:arrow-up" width={14} height={14} />}
        {note}
      </small>
    </article>
  );
}
