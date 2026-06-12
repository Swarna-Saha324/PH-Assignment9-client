// 📄 src/app/doctors/[id]/page.jsx
import React from "react";
// আপনার প্রজেক্টে যদি রিলেটিভ পাথ কাজ করে থাকে, তবে এটিই রাখুন:
import SigleDoctorClient from "../../components/SigleDoctorClient"; 

// 🔍 ১. generateMetadata তে params এখন async এবং await করতে হবে
export async function generateMetadata({ params }) {
  // params-কে await করে id বের করা হচ্ছে
  const resolvedParams = await params; 
  const id = resolvedParams.id;

  try {
    const res = await fetch(`http://localhost:5000/doctors/${id}`);
    const doctor = await res.json();
    return {
      title: `${doctor?.name || "Doctor Details"} | DocAppoint`,
      description: `Book an appointment with ${doctor?.name || "our specialist"}.`,
    };
  } catch (err) {
    return { title: "Doctor Profile | DocAppoint" };
  }
}

// 🔍 ২. মেইন পেজ কম্পোনেন্টেও params-কে await করতে হবে
export default async function DynamicDoctorPage({ params }) {
  // এখানেও params একটি Promise, তাই await করা বাধ্যতামূলক
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className="bg-[#0d193b] min-h-screen">
      {/* আনর‍্যাপ করা আইডি-টি ক্লায়েন্ট কম্পোনেন্টে পাস করা হলো */}
      <SigleDoctorClient id={id} />
    </div>
  );
}