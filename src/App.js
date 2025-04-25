// src/App.js
import React, { useEffect, useState } from "react";
import { fetchDoctors, fetchSpecialities } from "./api"; 
import DoctorList from "./components/DoctorList";
import Filters from "./components/FilterComponent";
import Header from "./components/Header";
import { useSearchParams } from "react-router-dom";
import "./App.css";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [consultationMode, setConsultationMode] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  const filters = {
    mode: consultationMode,
    specialities: selectedSpecialities,
    sort: sortOption,
    search: params.get("search") || "",
  };

  const clearFilters = () => {
    setConsultationMode("");
    setSelectedSpecialities([]);
    setSortOption("");
  };

  useEffect(() => {
    fetchDoctors().then(({ doctors, specialities }) => {
      console.log("Doctors fetched:", doctors);
      console.log("Specialities fetched:", specialities);
  
      setDoctors(Array.isArray(doctors) ? doctors : []);
      setSpecialities(Array.isArray(specialities) ? specialities : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!doctors || doctors.length === 0) return;

    let result = [...doctors];

    if (filters.search) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.mode) {
      result = result.filter((doc) => doc.mode === filters.mode);
    }

    if (filters.specialities.length > 0) {
      result = result.filter((doc) =>
        filters.specialities.every((s) =>
          doc.speciality.map((spec) => spec.name).includes(s)
        )
      );
    }

    if (filters.sort === "fees") {
      result.sort((a, b) => a.fees - b.fees);
    } else if (filters.sort === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
  }, [params, doctors, consultationMode, selectedSpecialities, sortOption]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="header">
        <Header data={doctors} />
      </div>
      <div className="app-container">
        <div className="sidebar">
          <Filters
            selectedSpecialities={selectedSpecialities}
            setSelectedSpecialities={setSelectedSpecialities}
            consultationMode={consultationMode}
            setConsultationMode={setConsultationMode}
            sortOption={sortOption}
            setSortOption={setSortOption}
            specialitiesList={specialities}
            clearFilters={clearFilters}
          />
        </div>
        <div className="main-content">
          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
}

export default App;
