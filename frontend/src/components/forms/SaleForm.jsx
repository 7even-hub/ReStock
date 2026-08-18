import { useMemo, useState } from 'react'
import { Field, SelectField, FormActions } from '../FormFields'

export default function SaleForm({ products, batches, onSubmit, busy }) {
  const [form, setForm] = useState({ productId: '', repackBatchId: '', quantitySold: '' })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const availableBatches = useMemo(() => batches.filter((batch) => !form.productId || (batch.productId?._id || batch.productId) === form.productId), [batches, form.productId])
  const selectedBatch = batches.find((batch) => batch._id === form.repackBatchId)
  const submit = (event) => { event.preventDefault(); onSubmit({ repackBatchId: form.repackBatchId, quantitySold: Number(form.quantitySold) }) }

  return <form className="form-stack" onSubmit={submit}>
    <SelectField label="Product" value={form.productId} onChange={(value) => setForm((current) => ({ ...current, productId: value, repackBatchId: '' }))} options={products.map((p) => ({ value: p._id, label: p.name }))} required />
    <SelectField label="Repack batch" value={form.repackBatchId} onChange={(value) => update('repackBatchId', value)} options={availableBatches.map((batch) => ({ value: batch._id, label: `${batch.packageSize}${batch.packageUnit} • ${batch.remainingUnits} units • ₦${Number(batch.sellingPrice).toLocaleString()}` }))} required />
    {selectedBatch && <div className="form-hint">Selling price is fixed by this batch: <strong>₦{Number(selectedBatch.sellingPrice).toLocaleString()}</strong></div>}
    <Field label="Quantity sold" type="number" min="1" step="1" value={form.quantitySold} onChange={(value) => update('quantitySold', value)} required />
    <FormActions><button className="primary-button full" disabled={busy}>{busy ? 'Recording...' : 'Record sale'}</button></FormActions>
  </form>
}
