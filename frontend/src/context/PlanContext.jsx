import { createContext, useContext, useState, useEffect } from "react";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(() => {
    // Try to get from localStorage on initial load
    const storedPlan = localStorage.getItem("selectedPlan");
    return storedPlan ? JSON.parse(storedPlan) : null;
  });

  // Save to localStorage whenever selectedPlan changes
  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
    } else {
      localStorage.removeItem("selectedPlan");
    }
  }, [selectedPlan]);

  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
