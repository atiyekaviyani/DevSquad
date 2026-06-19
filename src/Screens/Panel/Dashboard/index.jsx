import DashboardLayout from "../../../Components/Panel/DashboardLayout";
import StatCard from "../../../Components/Panel/StatCard";
import OrderCard from "../../../Components/Panel/OrderCard";
import Favorites from "../../../Components/Panel/Favorites";
import AddressCard from "../../../Components/Panel/AddressCard";
import ActionsQuick from "../../../Components/Panel/ActionsQuick";
import CardCalendar from "../../../Components/Panel/CardCalendar";

import {
  ShoppingBag,
  Heart,
  MapPin,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        <StatCard title="کل سفارش‌ها" value="124" icon={ShoppingBag} />
        <StatCard title="محصولات مورد علاقه" value="18" icon={Heart} />
        <StatCard title="آدرس‌های ثبت شده" value="3" icon={MapPin} />
        <StatCard title="سبد خرید" value="5" icon={ShoppingCart} />
        <StatCard
          title="مجموع فروش"
          value="12,400,000 تومان"
          icon={DollarSign}
        />
      </div>

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
