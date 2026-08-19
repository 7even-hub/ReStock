import { useCallback, useEffect, useState } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import ShopSetup from "./pages/ShopSetup";
import Dashboard from "./components/Dashboard";
import {
  authApi,
  dashboardApi,
  inventoryApi,
  productApi,
  purchaseApi,
  repackApi,
  salesApi,
  expenseApi,
  alertApi,
} from "./services/api";

const demoDashboard = {
  dashboard: {
    today: { sales: 84500, profit: 21300, transactions: 18, unitsSold: 52 },
    inventory: {
      repackRemaining: 346,
      bulkRemaining: 74,
      productCount: 24,
      lowStockCount: 3,
      unresolvedAlertCount: 3,
    },
    salesLast7Days: [
      { date: "2026-08-09", label: "Sun", sales: 58000 },
      { date: "2026-08-10", label: "Mon", sales: 42200 },
      { date: "2026-08-11", label: "Tue", sales: 76500 },
      { date: "2026-08-12", label: "Wed", sales: 63100 },
      { date: "2026-08-13", label: "Thu", sales: 89400 },
      { date: "2026-08-14", label: "Fri", sales: 71200 },
      { date: "2026-08-15", label: "Sat", sales: 84500 },
    ],
    lowStockProducts: [
      {
        productId: "1",
        name: "Golden Penny Sugar",
        category: "Groceries",
        repackRemaining: 4,
      },
      {
        productId: "2",
        name: "Mama Gold Rice",
        category: "Grains",
        repackRemaining: 6,
      },
      {
        productId: "3",
        name: "Peak Milk",
        category: "Beverages",
        repackRemaining: 8,
      },
    ],
    recentSales: [
      {
        _id: "1",
        productName: "Mama Gold Rice",
        quantitySold: 3,
        totalAmount: 5400,
        saleDate: "2026-08-15",
      },
      {
        _id: "2",
        productName: "Golden Penny Sugar",
        quantitySold: 4,
        totalAmount: 3800,
        saleDate: "2026-08-15",
      },
      {
        _id: "3",
        productName: "Peak Milk",
        quantitySold: 6,
        totalAmount: 7200,
        saleDate: "2026-08-14",
      },
    ],
  },
};
const demoProducts = {
  products: [
    { _id: "1", name: "Mama Gold Rice", category: "Grains", lowStockLimit: 10 },
    {
      _id: "2",
      name: "Golden Penny Sugar",
      category: "Groceries",
      lowStockLimit: 8,
    },
    { _id: "3", name: "Peak Milk", category: "Beverages", lowStockLimit: 12 },
    {
      _id: "4",
      name: "Indomie Noodles",
      category: "Groceries",
      lowStockLimit: 10,
    },
  ],
};
const demoInventory = {
  inventory: [
    {
      _id: "1",
      productId: demoProducts.products[0],
      bulkRemaining: 42,
      bulkUnit: "kg",
      repackRemaining: 6,
    },
    {
      _id: "2",
      productId: demoProducts.products[1],
      bulkRemaining: 18,
      bulkUnit: "kg",
      repackRemaining: 4,
    },
    {
      _id: "3",
      productId: demoProducts.products[2],
      bulkRemaining: 14,
      bulkUnit: "kg",
      repackRemaining: 8,
    },
    {
      _id: "4",
      productId: demoProducts.products[3],
      bulkRemaining: 0,
      bulkUnit: "cartons",
      repackRemaining: 38,
    },
  ],
};
const demoPurchases = {
  purchases: [
    {
      _id: "p1",
      productId: demoProducts.products[0],
      weight: 50,
      remainingWeight: 42,
      weightUnit: "kg",
      totalCost: 68000,
      purchaseDate: "2026-08-12",
    },
    {
      _id: "p2",
      productId: demoProducts.products[1],
      weight: 25,
      remainingWeight: 18,
      weightUnit: "kg",
      totalCost: 28000,
      purchaseDate: "2026-08-11",
    },
  ],
};
const demoBatches = {
  batches: [
    {
      _id: "1",
      productId: demoProducts.products[0],
      bulkPurchaseId: "p1",
      packageSize: 1,
      packageUnit: "kg",
      sellingPrice: 1800,
      costPerUnit: 1360,
      remainingUnits: 6,
      status: "active",
    },
    {
      _id: "2",
      productId: demoProducts.products[1],
      bulkPurchaseId: "p2",
      packageSize: 1,
      packageUnit: "kg",
      sellingPrice: 950,
      costPerUnit: 800,
      remainingUnits: 4,
      status: "active",
    },
    {
      _id: "3",
      productId: demoProducts.products[2],
      bulkPurchaseId: "p3",
      packageSize: 400,
      packageUnit: "g",
      sellingPrice: 1200,
      costPerUnit: 900,
      remainingUnits: 8,
      status: "active",
    },
  ],
};
const demoSales = {
  sales: demoDashboard.dashboard.recentSales.map((sale) => ({
    ...sale,
    sellingPrice: sale.totalAmount / sale.quantitySold,
    profit: sale.totalAmount * 0.25,
  })),
};

function App() {
  const savedToken = localStorage.getItem("stocksplit-token");
  const savedUser = JSON.parse(
    localStorage.getItem("stocksplit-user") || "null",
  );
  const [screen, setScreen] = useState(
    savedUser && savedToken ? "dashboard" : "login",
  );
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState(savedUser);
  const [data, setData] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [batches, setBatches] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useState("overview");
  const [isDemo, setIsDemo] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    const token = localStorage.getItem("stocksplit-token");

    if (!token) return;
    const [
      dashboardData,
      inventoryData,
      productsData,
      purchasesData,
      salesData,
      batchesData,
      expensesData,
      alertsData,
    ] = await Promise.all([
      dashboardApi.get(token),
      inventoryApi.get(token),
      productApi.get(token),
      purchaseApi.get(token),
      salesApi.get(token),
      repackApi.get(token),
      expenseApi.get(token),
      alertApi.get(token),
    ]);
    setData(dashboardData);
    setInventory(inventoryData.inventory || []);
    setProducts(productsData.products || []);
    setPurchases(purchasesData.purchases || []);
    setSales(salesData.sales || []);
    setBatches(batchesData.batches || []);
    setExpenses(expensesData.expenses || []);
    setAlerts(alertsData.alerts || []);
  }, []);

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem("stocksplit-token");
      const savedUser = JSON.parse(
        localStorage.getItem("stocksplit-user") || "null",
      );

      if (!token || !savedUser) {
        setInitializing(false);
        return;
      }

      setUser(savedUser);

      try {
        await loadData();
        setScreen("dashboard");
      } catch (apiError) {
        console.error("Session restore failed:", apiError);
        setError(apiError.message);
      } finally {
        setInitializing(false);
      }
    };

    initializeApp();
  }, [loadData]);

  const login = async (details) => {
    setBusy(true);
    setError("");
    try {
      const result = await authApi.login(details);
      localStorage.setItem("stocksplit-token", result.token);
      localStorage.setItem("stocksplit-user", JSON.stringify(result.user));
      setUser(result.user);
      setIsDemo(false);
      setPage("overview");
      setScreen("dashboard");
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setBusy(false);
    }
  };
  const register = async (details) => {
    setBusy(true);
    setError("");
    try {
      await authApi.register(details);
      setMode("login");
      setError("Account created successfully. Sign in to continue.");
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setBusy(false);
    }
  };
  const demo = () => {
    setUser({ username: "Ada", shopName: "Ada’s Provisions" });
    setData(demoDashboard);
    setInventory(demoInventory.inventory);
    setProducts(demoProducts.products);
    setPurchases(demoPurchases.purchases);
    setSales(demoSales.sales);
    setBatches(demoBatches.batches);
    setExpenses([]);
    setAlerts([
      {
        _id: "a1",
        productId: demoProducts.products[1],
        message: "Golden Penny Sugar is low on retail stock.",
        resolved: false,
      },
    ]);
    setPage("overview");
    setIsDemo(true);
    setError("");
    setScreen("dashboard");
  };

  const mutate = async (action) => {
    if (isDemo) return;
    setBusy(true);
    setError("");
    try {
      const token = localStorage.getItem("stocksplit-token");
      await action(token);
      await loadData();
    } catch (apiError) {
      setError(apiError.message);
      throw apiError;
    } finally {
      setBusy(false);
    }
  };
  const createProduct = (details) =>
    mutate((token) => productApi.create(token, details));
  const createPurchase = (details) =>
    mutate((token) => purchaseApi.create(token, details));
  const createRepack = (details) =>
    mutate((token) => repackApi.create(token, details));
  const recordSale = (details) =>
    mutate((token) => salesApi.create(token, details));
  const createExpense = (details) =>
    mutate((token) => expenseApi.create(token, details));
  const resolveAlert = (id) => mutate((token) => alertApi.resolve(token, id));

  const logout = () => {
    localStorage.removeItem("stocksplit-token");
    localStorage.removeItem("stocksplit-user");
    setUser(null);
    setData(null);
    setInventory([]);
    setProducts([]);
    setPurchases([]);
    setSales([]);
    setBatches([]);
    setExpenses([]);
    setAlerts([]);
    setPage("overview");
    setIsDemo(false);
    setMode("login");
    setError("");
    setScreen("login");
  };
  const refresh = async () => {
    if (isDemo) return;
    setBusy(true);
    try {
      await loadData();
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setBusy(false);
    }
  };

  if (user && !user.onboardingComplete) {
    return (
      <ShopSetup
        user={user}
        onComplete={(updatedUser) => {
          localStorage.setItem("stocksplit-user", JSON.stringify(updatedUser));

          setUser(updatedUser);
          setPage("overview");
          setScreen("dashboard");
        }}
      />
    );
  }

  if (initializing) {
    return (
      <div className="app-loading">
        <div className="app-loading-card">
          <div className="loading-logo">
            Stock<span>Split</span>
          </div>

          <div className="loading-spinner" />

          <p>Loading your shop...</p>
          <small>Getting everything ready</small>
        </div>
      </div>
    );
  }

  if (screen === "dashboard" && data)
    return (
      <Dashboard
        user={user}
        data={data}
        inventory={inventory}
        products={products}
        purchases={purchases}
        sales={sales}
        batches={batches}
        expenses={expenses}
        alerts={alerts}
        page={page}
        isDemo={isDemo}
        busy={busy}
        error={error}
        onNavigate={setPage}
        onRefresh={refresh}
        onCreateProduct={createProduct}
        onCreatePurchase={createPurchase}
        onCreateRepackBatch={createRepack}
        onRecordSale={recordSale}
        onCreateExpense={createExpense}
        onResolveAlert={resolveAlert}
        onLogout={logout}
      />
    );
  return (
    <AuthPage
      mode={mode}
      onModeChange={setMode}
      onLogin={login}
      onRegister={register}
      onDemo={demo}
      busy={busy}
      error={error}
    />
  );
}

export default App;
