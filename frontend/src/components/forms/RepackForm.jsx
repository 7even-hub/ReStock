import { useMemo, useState } from 'react'
import { Field, SelectField, FormActions } from '../FormFields'

export default function RepackForm({ products, purchases, onSubmit, busy }) {
  const [form, setForm] = useState({ productId: '', bulkPurchaseId: '', packageSize: '', packageUnit: 'kg', actualUnits: '', targetMargin: '', sellingPrice: '' })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const productPurchases = useMemo(() => purchases.filter((purchase) => !form.productId || (purchase.productId?._id || purchase.productId) === form.productId), [purchases, form.productId])
  const submit = (event) => { event.preventDefault(); onSubmit({ bulkPurchaseId: form.bulkPurchaseId, packageSize: Number(form.packageSize), packageUnit: form.packageUnit, actualUnits: Number(form.actualUnits), targetMargin: Number(form.targetMargin), sellingPrice: form.sellingPrice ? Number(form.sellingPrice) : undefined }) }

  return <form className="form-stack" onSubmit={submit}>
    <SelectField label="Product" value={form.productId} onChange={(value) => setForm((current) => ({ ...current, productId: value, bulkPurchaseId: '' }))} options={products.map((p) => ({ value: p._id, label: p.name }))} required />
    <SelectField label="Bulk purchase" value={form.bulkPurchaseId} onChange={(value) => update('bulkPurchaseId', value)} options={productPurchases.map((purchase) => ({ value: purchase._id, label: `${purchase.remainingWeight}${purchase.weightUnit} remaining • ₦${Number(purchase.totalCost).toLocaleString()}` }))} required />
    <div className="form-grid"><Field label="Package size" type="number" min="0.0001" step="any" value={form.packageSize} onChange={(value) => update('packageSize', value)} required /><SelectField label="Package unit" value={form.packageUnit} onChange={(value) => update('packageUnit', value)} options={['g', 'kg', 'ml', 'l'].map((v) => ({ value: v, label: v }))} required /></div>
    <Field label="Actual units produced" type="number" min="1" step="1" value={form.actualUnits} onChange={(value) => update('actualUnits', value)} required />
    <div className="form-grid"><Field label="Target margin (%)" type="number" min="0" max="99.99" step="0.01" value={form.targetMargin} onChange={(value) => update('targetMargin', value)} required /><Field label="Selling price (optional)" type="number" min="0.01" step="0.01" value={form.sellingPrice} onChange={(value) => update('sellingPrice', value)} placeholder="Use suggested price" /></div>
    <FormActions><button className="primary-button full" disabled={busy}>{busy ? 'Processing...' : 'Create repack batch'}</button></FormActions>
  </form>
}
