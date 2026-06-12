
import React from "react";

import SigleDoctorClient from "../../components/SigleDoctorClient"; 


export async function generateMetadata({ params }) {
  
  const resolvedParams = await params; 
  const id = resolvedParams.id;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors/${id}`);
    const doctor = await res.json();
    return {
      title: `${doctor?.name || "Doctor Details"} | DocAppoint`,
      description: `Book an appointment with ${doctor?.name || "our specialist"}.`,
    };
  } catch (err) {
    return { title: "Doctor Profile | DocAppoint" };
  }
}


export default async function DynamicDoctorPage({ params }) {

  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className="bg-[#0d193b] min-h-screen">
     
      <SigleDoctorClient id={id} />
    </div>
  );
}