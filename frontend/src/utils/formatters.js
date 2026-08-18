export function toNumber(value, fallback = 0) {
  if (value === null || value === undefined) {
    return fallback
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback
  }

  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }

  if (
    typeof value === 'object' &&
    value.$numberDecimal !== undefined
  ) {
    const parsed = Number(value.$numberDecimal)

    return Number.isFinite(parsed)
      ? parsed
      : fallback
  }

  if (
    typeof value === 'object' &&
    typeof value.toString === 'function'
  ) {
    const parsed = Number(value.toString())

    return Number.isFinite(parsed)
      ? parsed
      : fallback
  }

  return fallback
}

export function formatMoney(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(toNumber(value))
}