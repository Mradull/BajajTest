import React from "react";
import { FaMapMarkerAlt, FaHospital } from "react-icons/fa";
import "./DoctorCard.css";

export default function DoctorCard({ doctor }) {
  if (!doctor) return null;

  const {
    name = "Unknown Doctor",
    speciality = [],
    experience = "N/A",
    mode = "",
    location = "Not specified",
    fees = "N/A",
  } = doctor;

  return (
    <div className="doctor-card">
      <div className="doctor-left">
        <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
      </div>

      <div className="doctor-middle">
        <h3>{doctor.name}</h3>
        <p className="doctor-speciality">{doctor.specialities?.[0]?.name || "Speciality not specified"}</p>
        <p className="doctor-qualifications">{doctor.doctor_introduction?.split(",").slice(1, 3).join(", ")}</p>
        <p className="doctor-experience">{doctor.experience || "Experience not available"}</p>
        <p className="doctor-clinic">
          <FaHospital /> {doctor.clinic?.name || "Clinic not specified"}
        </p>
        <p className="doctor-location">
          <FaMapMarkerAlt /> {doctor.clinic?.address?.locality || "Location not available"}
        </p>
      </div>

      <div className="doctor-right">
        <p className="doctor-fees"> {doctor.fees}</p>
        <button className="book-button">Book Appointment</button>
      </div>
    </div>
  );
}
