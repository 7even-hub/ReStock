import { useState } from "react";
import illustration from "../assets/onboarding-illustration.jpg";
import Icon from "./Icon";

const initialRegister = {
  username: "",
  shopName: "",
  phoneNumber: "",
  email: "",
  password: "",
};

export default function AuthPage({
  mode,
  onModeChange,
  onLogin,
  onRegister,
  onDemo,
  busy,
  error,
}) {
  const isLogin = mode === "login";
  const [form, setForm] = useState(
    isLogin ? { email: "", password: "" } : initialRegister,
  );
  const [showPassword, setShowPassword] = useState(false);
  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    if (isLogin) await onLogin(form);
    else await onRegister(form);
  };
  const switchMode = () => {
    setForm(isLogin ? initialRegister : { email: "", password: "" });
    onModeChange(isLogin ? "register" : "login");
  };
  

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <a className="brand" href="/">
          Stock<span>Split</span>
        </a>
        <div className="auth-copy">
          <p className="eyebrow">
            {isLogin ? "WELCOME BACK" : "START FOR FREE"}
          </p>
          <h1>
            {isLogin
              ? "Welcome back to your shop."
              : "Take control of your stock."}
          </h1>
          <p>
            {isLogin
              ? "Sign in to see the latest activity in your business."
              : "Set up your shop and start tracking every item, sale, and profit."}
          </p>
        </div>
        <form className="auth-form" onSubmit={submit}>
          {!isLogin && (
            <>
              <label>
                Full name
                <input
                  name="username"
                  value={form.username}
                  onChange={update}
                  placeholder="e.g. Ada Okafor"
                  required
                  minLength="3"
                />
              </label>
              <label>
                Shop name
                <input
                  name="shopName"
                  value={form.shopName}
                  onChange={update}
                  placeholder="e.g. Ada’s Provisions"
                  required
                />
              </label>
              <label>
                Phone number
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={update}
                  placeholder="e.g. 0801 234 5678"
                  required
                />
              </label>
            </>
          )}
          <label>
            Email address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <span className="input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={update}
                placeholder="At least 6 characters"
                required
                minLength="6"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Show or hide password"
              >
                <Icon name="eye" size={18} />
              </button>
            </span>
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="primary-button full-button" disabled={busy}>
            {busy ? "Please wait…" : isLogin ? "Sign in" : "Create account"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? "New to StockSplit?" : "Already have an account?"}{" "}
          <button type="button" onClick={switchMode}>
            {isLogin ? "Create an account" : "Sign in"}
          </button>
        </p>
        {isLogin && (
          <button className="demo-link" type="button" onClick={onDemo}>
            Explore the dashboard with demo data
          </button>
        )}
      </section>
      <aside className="auth-visual">
        <a className="brand brand-light" href="/">
          Stock<span>Split</span>
        </a>
        <div className="auth-illustration">
          <img src={illustration} alt="A shop owner managing a mini-mart" />
          <div className="visual-card">
            <span className="mini-icon">
              <Icon name="chart" size={18} />
            </span>
            <div>
              <strong>Clearer decisions</strong>
              <small>Know your stock and profit at a glance.</small>
            </div>
          </div>
        </div>
        <p>Built for the everyday Nigerian retailer.</p>
      </aside>
    </main>
  );
}
