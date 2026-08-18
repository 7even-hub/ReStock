export function Field({ label, type = 'text', value, onChange, placeholder, required, min, step }) {
  return <label className="form-field"><span>{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} min={min} step={step} /></label>
}

export function SelectField({ label, value, onChange, options, required }) {
  return <label className="form-field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} required={required}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
}

export function FormActions({ children }) {
  return <div className="form-actions">{children}</div>
}
