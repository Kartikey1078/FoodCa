import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProgressNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  const links2 = [
    { href: "/plans/Plan", label: "Select Plan", icon: "select-plans", step: "plan" },
    { href: "/plans/SelectMeal", label: "Select Meal", icon: "select-meal", step: "meal" },
    { href: "/plans/Register", label: "Account", icon: "register", step: "register" },
    { href: "/plans/Address", label: "Address", icon: "address", step: "address" },
    { href: "/plans/Payment", label: "Payment", icon: "payment", step: "payment" },
  ];

  const STEP_MAPPING = {
    "/plans/Plan": "plan",
    "/plans/SelectMeal": "meal",
    "/plans/Register": "register",
    "/plans/Address": "address",
    "/plans/Payment": "payment",
  };

  const STEPS = ["plan", "meal", "register", "address", "payment"];

  // With no Redux → treat completed steps as:
  // completed ONLY if user has reached or passed them
  const isProgressItemActive = (href) => {
    const target = STEP_MAPPING[href];
    const current = STEP_MAPPING[pathname];

    if (!target) return false;

    if (href === pathname) return true;

    if (current) {
      return STEPS.indexOf(target) < STEPS.indexOf(current);
    }

    return false;
  };

  const handleStepNavigation = (href) => {
    navigate(href);
  };

  return (
    <ul className="flex justify-center items-center text-gray-700 font-medium">
      {links2.map((link, index) => (
        <React.Fragment key={index}>
          <li className="flex flex-col items-center gap-1">
            <div
              onClick={() => handleStepNavigation(link.href)}
              className={`cursor-pointer ${
                isProgressItemActive(link.href)
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <img
                  src={`/About-NavLink-Icons/${link.icon}.svg`}
                  alt={link.label}
                  className="h-5 w-5"
                  style={{
                    filter: isProgressItemActive(link.href)
                      ? "brightness(0) saturate(100%) invert(58%) sepia(67%) saturate(1581%) hue-rotate(85deg)"
                      : "none",
                    opacity: isProgressItemActive(link.href) ? 1 : 0.5,
                  }}
                />
                <span className="text-sm">{link.label}</span>
              </div>
            </div>
          </li>

          {/* Divider */}
          {index < links2.length - 1 && (
            <div
              className={`w-[60px] h-px ${
                isProgressItemActive(link.href) &&
                isProgressItemActive(links2[index + 1].href)
                  ? "bg-green-600"
                  : "bg-gray-300"
              } mb-7`}
            />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ProgressNav;
