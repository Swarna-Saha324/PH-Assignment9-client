import React from "react";
import AllAppointmentsClient from "./AllAppointmentsClient";


export const metadata = {
  title: "Available Medical Appointments | DocAppoint",
  description: "Browse and book appointments with verified medical specialists and expert doctors instantly.",
  keywords: ["doctor appointment", "book doctor online", "medical specialists", "healthcare"],
};

export default function AllAppointmentsPage() {
  return <AllAppointmentsClient />;
}