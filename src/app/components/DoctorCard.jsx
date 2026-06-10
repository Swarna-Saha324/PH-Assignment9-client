"use client";

import React from "react";
import Image from "next/image";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

export default function DoctorCard({ doctor, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Card Thumbnail Box */}
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Image
          src={doctor.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"}
          alt={doctor.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide">
          {doctor.specialty}
        </span>
      </div>

      {/* Card Meta Content */}
      <div className="p-6 flex-grow space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-1">
            <Briefcase className="w-4 h-4 shrink-0 text-blue-500" />
            <span>{doctor.experience} Experience</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {doctor.description}
        </p>

        <div className="space-y-2 pt-2 border-t border-gray-50 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="truncate">{doctor.hospital}</span>
          </div>
          <div className="flex items-center justify-between font-medium pt-1">
            <div className="flex items-center gap-1 text-emerald-600 font-bold">
              <DollarSign className="w-4 h-4 shrink-0" />
              <span>{doctor.fee} BDT</span>
            </div>
            
            {/* Conditional Availability Slot protection */}
            {doctor.availability && doctor.availability.length > 0 && (
              <div className="flex items-center gap-1 text-amber-600 text-xs bg-amber-50 px-2 py-0.5 rounded">
                <Clock className="w-3.5 h-3.5" />
                <span>{doctor.availability[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button Layer */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onViewDetails(doctor.id || doctor._id)}
          className="w-full text-center bg-gray-50 text-blue-600 font-semibold py-3 px-4 rounded-xl border border-blue-50 hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-200 text-sm"
        >
          View Details
        </button>
      </div>

    </div>
  );
}