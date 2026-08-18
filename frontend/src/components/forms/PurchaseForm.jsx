import { useState } from 'react'
import { Field, SelectField, FormActions } from '../FormFields'

export default function PurchaseForm({ products, onSubmit, busy }) {
  const [form, setForm] = useState({ productId: '', quantity: '', unit: '', weight: '', weightUnit: 'kg', totalCost: '' })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event) => { event.preventDefault(); onSubmit({ ...form, quantity: Number(form.quantity), weight: Number(form.weight), totalCost: Number(form.totalCost) }) }

  return <form className="form-stack" onSubmit={submit}>
    <SelectField label="Product" value={form.productId} onChange={(value) => update('productId', value)} options={products.map((p) => ({ value: p._id, label: p.name }))} required />
    <div className="form-grid"><Field label="Quantity" type="number" min="0.0001" step="any" value={form.quantity} onChange={(value) => update('quantity', value)} required /><Field label="Unit" value={form.unit} onChange={(value) => update('unit', value)} placeholder="bag, carton, sack" required /></div>
    <div className="form-grid"><Field label="Weight" type="number" min="0.0001" step="any" value={form.weight} onChange={(value) => update('weight', value)} required /><SelectField label="Weight unit" value={form.weightUnit} onChange={(value) => update('weightUnit', value)} options={['g', 'kg', 'ml', 'l'].map((v) => ({ value: v, label: v }))} required /></div>
    <Field label="Total cost (₦)" type="number" min="0.01" step="0.01" value={form.totalCost} onChange={(value) => update('totalCost', value)} required />
    <FormActions><button className="primary-button full" disabled={busy}>{busy ? 'Saving...' : 'Record purchase'}</button></FormActions>
  </form>
}
