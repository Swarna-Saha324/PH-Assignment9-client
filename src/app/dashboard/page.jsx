import React from "react";
import DashboardPage from "./DashboardPage";


export const metadata = {
  title: "Dashboard | DocAppoint",
  description: "Your personalized dashboard to manage appointments, view top doctors, and access your medical history with ease.",
  keywords: ["dashboard", "medical appointments",  "appointment management", "medical history"],
};

export default function Dashboard() {
  return <DashboardPage />;
}