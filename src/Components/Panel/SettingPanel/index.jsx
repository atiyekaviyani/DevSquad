import React, { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import {
  User,
  Lock,
  Save,
  Phone,
  Eye,
  EyeOff,
  CreditCard,
  Monitor,
  Smartphone,
  Tablet,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import getCroppedImg from "./cropImage";
import {
  getProfile,
  updateProfile,
  getDevices,
  revokeDevice,
} from "../../../Core/Services/api/profileApi";

export default function UserSettingsAdvanced() {
  const initialState = {
    name: "",
    family: "",
    phone: "",
    national_code: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [userInfo, setUserInfo] = useState(initialState);

  const [profileImage, setProfileImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [devices, setDevices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [devicesLoading, setDevicesLoading] = useState(true);
  const [removingDeviceId, setRemovingDeviceId] = useState(null);

  const [validationMessage, setValidationMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [devicesError, setDevicesError] = useState("");

  // ---------------------------------------
  // دریافت اطلاعات پروفایل
  // ---------------------------------------
  const loadProfile = async () => {
    try {
      setLoading(true);
      setValidationMessage("");

      const response = await getProfile();

      console.log("SETTINGS PROFILE RESPONSE:", response);

      if (response?.status && response?.data) {
        const profile = response.data;

        setUserInfo({
          name: profile.name || "",
          family: profile.family || "",
          phone: profile.phone || "",
          national_code: profile.national_code || "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setValidationMessage(
          response?.message || "دریافت اطلاعات کاربر ناموفق بود."
        );
      }
    } catch (error) {
      console.error("GET PROFILE ERROR:", error);

      setValidationMessage(
        error?.message || "خطا در دریافت اطلاعات کاربر."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // دریافت دستگاه‌ها
  // ---------------------------------------
  const loadDevices = async () => {
    try {
      setDevicesLoading(true);
      setDevicesError("");

      const response = await getDevices();

      console.log("SETTINGS DEVICES RESPONSE:", response);

      if (response?.status) {
        setDevices(Array.isArray(response.data) ? response.data : []);
      } else {
        setDevicesError(
          response?.message || "دریافت دستگاه‌ها ناموفق بود."
        );
      }
    } catch (error) {
      console.error("GET DEVICES ERROR:", error);

      setDevicesError(
        error?.message || "خطا در دریافت دستگاه‌های فعال."
      );
    } finally {
      setDevicesLoading(false);
    }
  };

  // ---------------------------------------
  // اجرای اولیه
  // ---------------------------------------
  useEffect(() => {
    loadProfile();
    loadDevices();
  }, []);

  // ---------------------------------------
  // Crop
  // ---------------------------------------
  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  // ---------------------------------------
  // انتخاب تصویر
  // ---------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setShowCropper(true);

    setValidationMessage("");
    setSuccessMessage("");
  };

  // ---------------------------------------
  // ذخیره Crop
  // ---------------------------------------
  const handleCropSave = async () => {
    if (!profileImage || !croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImg(
        profileImage,
        croppedAreaPixels
      );

      setProfileImage(croppedImage);
      setShowCropper(false);
    } catch (error) {
      console.error("CROP ERROR:", error);

      setValidationMessage("برش تصویر با خطا مواجه شد.");
    }
  };

  // ---------------------------------------
  // تغییر Inputها
  // ---------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationMessage("");
    setSuccessMessage("");
  };

  // ---------------------------------------
  // نمایش / مخفی کردن رمز
  // ---------------------------------------
  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // ---------------------------------------
  // ذخیره تغییرات پروفایل
  // ---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationMessage("");
    setSuccessMessage("");

    // بررسی رمز جدید
    if (
      userInfo.newPassword &&
      userInfo.newPassword !== userInfo.confirmPassword
    ) {
      setValidationMessage(
        "رمز جدید و تایید رمز جدید همخوانی ندارند."
      );
      return;
    }

    // اگر رمز وارد نشده، password را ارسال نمی‌کنیم
    const profileData = {
      name: userInfo.name.trim(),
      family: userInfo.family.trim(),
      phone: userInfo.phone.trim(),
      national_code: userInfo.national_code.trim(),
    };

    if (userInfo.newPassword.trim()) {
      profileData.password = userInfo.newPassword.trim();
    }

    // اعتبارسنجی ساده
    if (!profileData.name) {
      setValidationMessage("نام الزامی است.");
      return;
    }

    if (!profileData.family) {
      setValidationMessage("نام خانوادگی الزامی است.");
      return;
    }

    if (!profileData.phone) {
      setValidationMessage("شماره تلفن الزامی است.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateProfile(profileData);

      console.log("UPDATE PROFILE RESPONSE:", response);

      if (response?.status) {
        setSuccessMessage(
          response?.message || "تغییرات با موفقیت ذخیره شد."
        );

        // بعد از ذخیره، اطلاعات جدید را دوباره از API می‌گیریم
        await loadProfile();

        // پاک کردن فیلدهای رمز
        setUserInfo((prev) => ({
          ...prev,
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setValidationMessage(
          response?.message || "ذخیره تغییرات ناموفق بود."
        );
      }
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);

      setValidationMessage(
        error?.message || "خطا در ذخیره تغییرات."
      );
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------
  // حذف دستگاه
  // ---------------------------------------
  const handleRevokeDevice = async (deviceId) => {
    if (!deviceId) return;

    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این دستگاه را از حساب خارج کنید؟"
    );

    if (!confirmed) return;

    try {
      setRemovingDeviceId(deviceId);
      setDevicesError("");

      const response = await revokeDevice(deviceId);

      console.log("REVOKE DEVICE RESPONSE:", response);

      if (response?.status) {
        setDevices((prev) =>
          prev.filter((device) => device.id !== deviceId)
        );
      } else {
        setDevicesError(
          response?.message || "حذف دستگاه ناموفق بود."
        );
      }
    } catch (error) {
      console.error("REVOKE DEVICE ERROR:", error);

      setDevicesError(
        error?.message || "خطا در حذف دستگاه."
      );
    } finally {
      setRemovingDeviceId(null);
    }
  };

  // ---------------------------------------
  // آیکون دستگاه
  // ---------------------------------------
  const getDeviceIcon = (deviceName = "") => {
    const name = deviceName.toLowerCase();

    if (
      name.includes("mobile") ||
      name.includes("phone") ||
      name.includes("android") ||
      name.includes("iphone")
    ) {
      return <Smartphone size={22} />;
    }

    if (
      name.includes("tablet") ||
      name.includes("ipad")
    ) {
      return <Tablet size={22} />;
    }

    return <Monitor size={22} />;
  };

  // ---------------------------------------
  // فرمت تاریخ
  // ---------------------------------------
  const formatDate = (date) => {
    if (!date) return "نامشخص";

    try {
      return new Date(date).toLocaleString("fa-IR");
    } catch {
      return date;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 text-white">
      <div className="max-w-6xl mx-auto">

        {/* عنوان */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">
            تنظیمات حساب کاربری
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            مدیریت اطلاعات حساب و دستگاه‌های فعال
          </p>
        </div>

        {/* Loading پروفایل */}
        {loading ? (
          <div className="bg-gray-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <RefreshCw
                size={20}
                className="animate-spin"
              />
              <span>در حال دریافت اطلاعات کاربر...</span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* -------------------------------- */}
            {/* عکس پروفایل */}
            {/* -------------------------------- */}
            <section className="bg-gray-800 p-6 rounded-2xl space-y-5">
              <div>
                <h2 className="text-xl font-medium">
                  عکس پروفایل
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  انتخاب و برش تصویر پروفایل
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">

                {profileImage && !showCropper ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
                    <User
                      size={48}
                      className="text-gray-500"
                    />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="profileUpload"
                  className="hidden"
                />

                <label
                  htmlFor="profileUpload"
                  className="cursor-pointer px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
                >
                  انتخاب تصویر
                </label>
              </div>

              {/* Cropper */}
              {showCropper && (
                <div className="relative w-full h-80 bg-gray-950 mt-4 rounded-xl overflow-hidden">

                  <Cropper
                    image={profileImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />

                  <div className="absolute bottom-4 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-4 px-4">

                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(e, value) =>
                        setZoom(value)
                      }
                      className="w-full md:w-1/2"
                    />

                    <button
                      type="button"
                      onClick={handleCropSave}
                      className="bg-white text-black px-5 py-2 rounded-xl hover:bg-gray-200 transition"
                    >
                      تایید تصویر
                    </button>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center">
                توجه: API فعلی بک‌اند فیلد ذخیره تصویر پروفایل ندارد؛
                بنابراین تصویر در این مرحله فقط در همین صفحه نمایش داده می‌شود.
              </p>
            </section>

            {/* -------------------------------- */}
            {/* اطلاعات حساب */}
            {/* -------------------------------- */}
            <section className="bg-gray-800 p-6 rounded-2xl space-y-5">
              <div>
                <h2 className="text-xl font-medium">
                  اطلاعات حساب
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  اطلاعات حساب از پروفایل کاربر دریافت می‌شود.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* نام */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    placeholder="نام"
                    autoComplete="given-name"
                    className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/30 outline-none transition"
                  />

                  <User
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>

                {/* نام خانوادگی */}
                <div className="relative">
                  <input
                    type="text"
                    name="family"
                    value={userInfo.family}
                    onChange={handleChange}
                    placeholder="نام خانوادگی"
                    autoComplete="family-name"
                    className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/30 outline-none transition"
                  />

                  <User
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>

                {/* شماره موبایل */}
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                    placeholder="شماره تلفن"
                    autoComplete="tel"
                    className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/30 outline-none transition"
                  />

                  <Phone
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>

                {/* کد ملی */}
                <div className="relative">
                  <input
                    type="text"
                    name="national_code"
                    value={userInfo.national_code}
                    onChange={handleChange}
                    placeholder="کد ملی"
                    className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/30 outline-none transition"
                  />

                  <CreditCard
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>
              </div>
            </section>

            {/* -------------------------------- */}
            {/* تغییر رمز */}
            {/* -------------------------------- */}
            <section className="bg-gray-800 p-6 rounded-2xl space-y-5">
              <div>
                <h2 className="text-xl font-medium">
                  تغییر رمز عبور
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  برای تغییر رمز، رمز جدید را وارد کنید.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* رمز جدید */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      togglePassword("new")
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-10"
                  >
                    {showPassword.new ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                  <Lock
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />

                  <input
                    type={
                      showPassword.new
                        ? "text"
                        : "password"
                    }
                    name="newPassword"
                    value={userInfo.newPassword}
                    onChange={handleChange}
                    placeholder="رمز جدید"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/30 outline-none transition"
                  />
                </div>

                {/* تایید رمز */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      togglePassword("confirm")
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-10"
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                  <Lock
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />

                  <input
                    type={
                      showPassword.confirm
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleChange}
                    placeholder="تایید رمز جدید"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/30 outline-none transition"
                  />
                </div>
              </div>
            </section>

            {/* -------------------------------- */}
            {/* پیام‌ها */}
            {/* -------------------------------- */}
            {validationMessage && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                <AlertCircle size={18} />
                <span>{validationMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
                <CheckCircle size={18} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* -------------------------------- */}
            {/* دکمه ذخیره */}
            {/* -------------------------------- */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition"
              >
                {saving ? (
                  <>
                    <RefreshCw
                      size={19}
                      className="animate-spin"
                    />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save size={19} />
                    ذخیره تغییرات
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ====================================== */}
        {/* دستگاه‌های فعال */}
        {/* ====================================== */}
        <section className="bg-gray-800 p-6 rounded-2xl mt-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-medium">
                دستگاه‌های فعال
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                دستگاه‌هایی که با حساب شما وارد شده‌اند.
              </p>
            </div>

            <button
              type="button"
              onClick={loadDevices}
              disabled={devicesLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition"
            >
              <RefreshCw
                size={17}
                className={
                  devicesLoading
                    ? "animate-spin"
                    : ""
                }
              />
              بروزرسانی
            </button>
          </div>

          {/* خطای دستگاه‌ها */}
          {devicesError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-5">
              <AlertCircle size={18} />
              <span>{devicesError}</span>
            </div>
          )}

          {/* Loading */}
          {devicesLoading ? (
            <div className="flex items-center justify-center py-10 text-gray-400 gap-3">
              <RefreshCw
                size={20}
                className="animate-spin"
              />
              <span>
                در حال دریافت دستگاه‌ها...
              </span>
            </div>
          ) : devices.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              دستگاه فعالی پیدا نشد.
            </div>
          ) : (
            <div className="space-y-4">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-900 border border-white/5 rounded-xl p-5"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-300">
                      {getDeviceIcon(device.name)}
                    </div>

                    <div>
                      <h3 className="font-medium text-white">
                        {device.name || "دستگاه ناشناس"}
                      </h3>

                      <p className="text-gray-500 text-xs mt-1">
                        ایجاد:
                        {" "}
                        {formatDate(
                          device.created_at
                        )}
                      </p>

                      <p className="text-gray-500 text-xs mt-1">
                        آخرین استفاده:
                        {" "}
                        {formatDate(
                          device.last_used_at
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleRevokeDevice(
                        device.id
                      )
                    }
                    disabled={
                      removingDeviceId ===
                      device.id
                    }
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {removingDeviceId ===
                    device.id ? (
                      <>
                        <RefreshCw
                          size={17}
                          className="animate-spin"
                        />
                        در حال حذف...
                      </>
                    ) : (
                      <>
                        <Trash2 size={17} />
                        حذف دستگاه
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}