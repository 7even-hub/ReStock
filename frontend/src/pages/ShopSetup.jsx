import { useState } from "react";
import { authApi } from "../services/api";

export default function ShopSetup({ onComplete }) {
  const [form, setForm] = useState({
    shopName: "",
    phoneNumber: "",
    businessType: "",
    location: "",
    preferredUnit: "",
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const token = localStorage.getItem("stocksplit-token");

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const result = await authApi.setupShop(token, form);

      localStorage.setItem("stocksplit-user", JSON.stringify(result.user));

      onComplete(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="setup-shell">
      <div className="setup-card">
        <div className="setup-heading">
          <img src="/main-logo.svg" alt="ReStock" />

          <div className="setup-progress">
            <div className="setup-progress-top">
              <span>Getting started</span>
              <strong>1 of 1</strong>
            </div>

            <div className="setup-progress-track">
              <span />
            </div>
          </div>

          <p className="eyebrow">LET'S GET YOU SET UP</p>

          <h1>Tell us about your shop.</h1>

          <p>
            A few details and ReStock will be ready to help you manage your
            inventory.
          </p>
        </div>

        <form className="setup-form" onSubmit={handleSubmit}>
          <label>
            Shop name
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              placeholder="e.g. Joseph Mini Mart"
              required
            />
          </label>

          <label>
            Phone number
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="08012345678"
              required
            />
          </label>

          <label>
            Business type
            <select
              name="businessType"
              value={form.businessType}
              onChange={handleChange}
              required
            >
              <option value="">Select business type</option>
              <option value="Mini Mart">Mini Mart</option>
              <option value="Provision Store">Provision Store</option>
              <option value="Supermarket">Supermarket</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Lagos"
              required
            />
          </label>

          <label>
            Preferred measurement unit
            <select
              name="preferredUnit"
              value={form.preferredUnit}
              onChange={handleChange}
              required
            >
              <option value="">Select preferred unit</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="litres">Litres (L)</option>
              <option value="pieces">Pieces</option>
              <option value="mixed">Mixed</option>
            </select>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button full-button" disabled={busy}>
            {busy ? "Setting up your shop..." : "Continue to ReStock"}
          </button>
        </form>
      </div>
    </main>
  );
}
