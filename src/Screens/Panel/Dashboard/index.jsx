import { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/Panel/DashboardLayout";
import StatCard from "../../../Components/Panel/StatCard";
import OrderCard from "../../../Components/Panel/OrderCard";
import Favorites from "../../../Components/Panel/Favorites";
import AddressCard from "../../../Components/Panel/AddressCard";
import ActionsQuick from "../../../Components/Panel/ActionsQuick";
import CardCalendar from "../../../Components/Panel/CardCalendar";
import { getUserStats } from "../../../Core/Services/api/statsApi";

import {
  ShoppingBag,
  Heart,
  MapPin,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getUserStats();

        console.log("STATS RESPONSE:", response);

        setStats(response?.data);
      } catch (err) {
        console.error("STATS ERROR:", err);

        setError(
          err?.response?.data?.message || "خطا در دریافت اطلاعات داشبورد",
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <DashboardLayout>
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        <StatCard
          title="کل سفارش‌ها"
          value={loading ? "..." : (stats?.total_orders ?? 0)}
          icon={ShoppingBag}
        />

        <StatCard
          title="محصولات مورد علاقه"
          value={loading ? "..." : (stats?.total_favorites ?? 0)}
          icon={Heart}
        />

        <StatCard
          title="آدرس‌های ثبت شده"
          value={loading ? "..." : (stats?.total_addresses ?? 0)}
          icon={MapPin}
        />

        <StatCard
          title="سبد خرید"
          value={loading ? "..." : (stats?.total_cart_items ?? 0)}
          icon={ShoppingCart}
        />

        <StatCard
          title="مجموع خرید"
          value={
            loading
              ? "..."
              : `${stats?.total_spent ?? "0"} ${stats?.currency ?? "تومان"}`
          }
          icon={DollarSign}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        <div className="xl:col-span-2 space-y-8">
          <OrderCard />
          <Favorites />
          <AddressCard />
        </div>

        <div className="space-y-8">
          <ActionsQuick />
          <CardCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
}
