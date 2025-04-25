// src/components/DoctorList.jsx
import React from "react";
import DoctorCard from "./DoctorCard";
import "./DoctorList.css";

export default function DoctorList({ doctors }) {
  if (!Array.isArray(doctors)) {
    console.error("doctors is not an array", doctors);
    return <div>No doctors available.</div>;
  }

  return (
    <div className="doctor-list">
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)
      )}
    </div>
  );
}
