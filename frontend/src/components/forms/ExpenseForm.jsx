import { useState } from "react";
import { Field, SelectField, FormActions } from "../FormFields";
// import { formatMoney } from "../../utils/formatters";

const types = [
  "transport",
  "packaging",
  "electricity",
  "rent",
  "labour",
  "spoilage",
  "maintenance",
  "other",
];

export default function ExpenseForm({ products, onSubmit, busy }) {
  const [form, setForm] = useState({
    amount: "",
    type: "other",
    description: "",
    productId: "",
  });
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount),
      productId: form.productId || undefined,
    });
  };
  return (
    <form className="form-stack" onSubmit={submit}>
      <Field
        label="Amount (₦)"
        type="number"
        min="0.01"
        step="0.01"
        value={form.amount}
        onChange={(value) => update("amount", value)}
        required
      />
      <SelectField
        label="Expense type"
        value={form.type}
        onChange={(value) => update("type", value)}
        options={types.map((v) => ({
          value: v,
          label: v[0].toUpperCase() + v.slice(1),
        }))}
        required
      />
      <SelectField
        label="Product (optional)"
        value={form.productId}
        onChange={(value) => update("productId", value)}
        options={products.map((p) => ({ value: p._id, label: p.name }))}
      />
      <Field
        label="Description"
        value={form.description}
        onChange={(value) => update("description", value)}
        placeholder="What was this expense for?"
      />
      <FormActions>
        <button className="primary-button full" disabled={busy}>
          {busy ? "Saving..." : "Record expense"}
        </button>
      </FormActions>
    </form>
  );
}
