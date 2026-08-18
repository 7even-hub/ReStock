import { useState } from "react";
import { Field, FormActions } from "../FormFields";

export default function ProductForm({ onSubmit, busy }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    lowStockLimit: "",
  });
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSubmit({ ...form, lowStockLimit: Number(form.lowStockLimit) });
  };

  return (
    <form className="form-stack" onSubmit={submit}>
      <Field
        label="Product name"
        value={form.name}
        onChange={(value) => update("name", value)}
        placeholder="e.g. Golden Penny Sugar"
        required
      />
      <Field
        label="Category"
        value={form.category}
        onChange={(value) => update("category", value)}
        placeholder="e.g. Groceries"
        required
      />
      <Field
        label="Low-stock limit"
        type="number"
        min="0"
        value={form.lowStockLimit}
        onChange={(value) => update("lowStockLimit", value)}
        required
      />
      <FormActions>
        <button className="primary-button full" disabled={busy}>
          {busy ? "Saving..." : "Add product"}
        </button>
      </FormActions>
    </form>
  );
}
