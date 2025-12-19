import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Steps = () => {
  const steps = [
    { id: 1, label: "تغییر رمز عبور", completed: true },
    { id: 2, label: "دریافت کد", completed: true },
    { id: 3, label: "شماره تماس", completed: false },
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <ul className="flex justify-between items-center">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="relative flex-1 text-center"
          >
            <div
              className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center
                ${
                  step.completed
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              {step.completed ? (
                <CheckCircleIcon className="w-6 h-6" />
              ) : (
                index + 1
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">{step.label}</p>

            {/* خط اتصال بین مراحل به جز آخرین */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-5 right-0 w-full h-1 ${
                  steps[index + 1].completed ? "bg-blue-600" : "bg-gray-300"
                }`}
                style={{ zIndex: -1, marginRight: "-50%" }}
              ></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Steps;
