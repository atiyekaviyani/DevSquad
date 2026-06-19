import React, { useState } from "react";
import ProfileForm from "../../../Components/Panel/ProfileForm";
import EmptyState from "../../../Components/Panel/EmptyState";

export default function Profile() {
  const [user, setUser] = useState({
    name: "علی رضایی",
    email: "ali@example.com",
    phone: "09121234567",
    avatar: "https://via.placeholder.com/150",
  });

  const handleSubmit = (data) => {
    console.log("اطلاعات جدید:", data);
    setUser(data);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileForm initialData={user} onSubmit={handleSubmit} />

        {!user.avatar && (
          <EmptyState message="تصویری برای پروفایل ثبت نشده" icon="👤" />
        )}
      </div>
    </div>
  );
}
