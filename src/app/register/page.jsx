import React from "react";
import RegisterPage from "./RegisterPage";


export const metadata = {
  title: "Register | DocAppoint",
  description: "Create a new DocAppoint account to manage appointments, view top doctors, and access your medical history with ease.",
  keywords: ["register", "medical appointments", "appointment management", "medical history"],
};

export default function Register() {
  return <RegisterPage />;
}