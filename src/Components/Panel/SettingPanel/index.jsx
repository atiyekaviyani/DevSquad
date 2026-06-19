import React, { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { User, Mail, Lock, Save, Phone, Eye, EyeOff } from "lucide-react";
import getCroppedImg from "./cropImage";

export default function UserSettingsAdvanced() {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: { email: true, panel: true, sms: false },
    privacy: { showProfile: true, receiveOffers: true },
  };

  const [userInfo, setUserInfo] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [validationMessage, setValidationMessage] = useState("");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setShowCropper(true);
    }
  };

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(profileImage, croppedAreaPixels);
      setProfileImage(croppedImage);
      setShowCropper(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in userInfo.notifications) {
      setUserInfo((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [name]: checked },
      }));
    } else if (name in userInfo.privacy) {
      setUserInfo((prev) => ({
        ...prev,
        privacy: { ...prev.privacy, [name]: checked },
      }));
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationMessage("");

    const isChanged = Object.keys(initialState).some((key) => {
      if (typeof initialState[key] === "object") {
        return (
          JSON.stringify(initialState[key]) !== JSON.stringify(userInfo[key])
        );
      }
      return initialState[key] !== userInfo[key];
    });

    if (!isChanged && !profileImage) {
      setValidationMessage("هیچ تغییری اعمال نشده است.");
      return;
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      setValidationMessage("رمز جدید و تایید آن همخوانی ندارند!");
      return;
    }

    console.log("اطلاعات ارسال شد:", { ...userInfo, profileImage });
    alert("تغییرات با موفقیت ذخیره شد!");
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-3xl mb-6 font-semibold">تنظیمات حساب کاربری</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* عکس پروفایل */}
        <section className="bg-gray-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-medium">عکس پروفایل</h2>
          <div className="flex flex-col items-center space-y-4">
            {profileImage && !showCropper && (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
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
              className="cursor-pointer px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              انتخاب تصویر
            </label>
          </div>
          {showCropper && (
            <div className="relative w-full h-80 bg-gray-700 mt-4 rounded-lg overflow-hidden">
              <Cropper
                image={profileImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e, z) => setZoom(z)}
                  className="w-1/2"
                />
                <button
                  type="button"
                  onClick={handleCropSave}
                  className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-900"
                >
                  ذخیره
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="bg-gray-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-medium">اطلاعات حساب</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative w-full">
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="نام و نام خانوادگی"
                autoComplete="name"
                className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/20 outline-none transition-all duration-300 autofill-white"
              />
              <User
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
            </div>

            <div className="relative w-full">
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="ایمیل"
                autoComplete="email"
                className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/20 outline-none transition-all duration-300 autofill-white"
              />
              <Mail
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
            </div>
          </div>

          <div className="relative w-full mt-4">
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              placeholder="شماره تلفن"
              autoComplete="tel"
              className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/20 outline-none transition-all duration-300 autofill-white"
            />
            <Phone
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-medium">تغییر رمز عبور</h2>
          <div className="flex flex-col space-y-3">
            {[
              {
                name: "currentPassword",
                placeholder: "رمز فعلی",
                field: "current",
              },
              { name: "newPassword", placeholder: "رمز جدید", field: "new" },
              {
                name: "confirmPassword",
                placeholder: "تایید رمز جدید",
                field: "confirm",
              },
            ].map(({ name, placeholder, field }) => (
              <div key={name} className="relative w-80">
                <button
                  type="button"
                  onClick={() => togglePassword(field)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword[field] ? (
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
                  type={showPassword[field] ? "text" : "password"}
                  name={name}
                  value={userInfo[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-12 py-2 rounded-xl bg-gray-900 text-white border border-white/10 focus:border-white/20 outline-none transition-all duration-300 autofill-white"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-xl overflow-hidden">
          <h2 className="text-xl font-medium mb-4">اعلان‌ها و حریم خصوصی</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-300 mb-2">اعلان‌ها</h3>
              {[
                { name: "email", label: "دریافت ایمیل" },
                { name: "panel", label: "نوتیفیکیشن داخل پنل" },
                { name: "sms", label: "پیامک" },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  className="relative flex items-center space-x-3 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={userInfo.notifications[name]}
                    onChange={handleChange}
                    className="w-5 h-5 left-2 relative accent-blue-600 rounded border-gray-500 
                       transition duration-300 ease-in-out
                       checked:scale-110 checked:accent-blue-500 
                       peer"
                  />
                  <span
                    className="absolute inset-0 rounded-full bg-blue-500 opacity-0 pointer-events-none 
                           group-active:animate-ripple"
                  ></span>
                  <span
                    className="text-white text-sm transition duration-300 ease-in-out 
                           group-hover:text-blue-400"
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-300 mb-2">حریم خصوصی</h3>
              {[
                { name: "showProfile", label: "نمایش پروفایل" },
                { name: "receiveOffers", label: "دریافت پیشنهادات و اخبار" },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  className="relative flex items-center space-x-3 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={userInfo.privacy[name]}
                    onChange={handleChange}
                    className="w-5 h-5 left-2 relative accent-blue-600 rounded border-gray-500 
                       transition duration-300 ease-in-out
                       checked:scale-110 checked:accent-blue-500
                       peer"
                  />

                  <span
                    className="absolute inset-0 rounded-full bg-blue-500 opacity-0 pointer-events-none 
                           group-active:animate-ripple"
                  ></span>
                  <span
                    className="text-white text-sm transition duration-300 ease-in-out 
                           group-hover:text-blue-400"
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes ripple {
              0% {
                transform: scale(0);
                opacity: 0.5;
              }
              50% {
                transform: scale(1);
                opacity: 0.2;
              }
              100% {
                transform: scale(1.5);
                opacity: 0;
              }
            }
            .animate-ripple {
              animation: ripple 0.4s ease-out forwards;
            }
          `}</style>
        </section>
        {validationMessage && (
          <p className="text-red-500 text-sm">{validationMessage}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-950 px-6 py-2 rounded text-white font-semibold"
          >
            <Save size={20} /> ذخیره تغییرات
          </button>
        </div>
      </form>

      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-internal-autofill-selected {
          -webkit-text-fill-color: white;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
