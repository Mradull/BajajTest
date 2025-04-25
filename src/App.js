import React, { useEffect, useState } from "react";
import { fetchDoctors } from "./api";
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
  const [params, setParams] = useSearchParams();

  const filters = {
    mode: consultationMode,
    specialities: selectedSpecialities,
    sort: sortOption,
    search: params.get("search") || "",
  };

  // Handle filter changes and update the URL search params
  const handleFilterChange = (newFilters) => {
    setConsultationMode(newFilters.mode);
    setSelectedSpecialities(newFilters.specialities);
    setSortOption(newFilters.sort);
  };

  const clearFilters = () => {
    setConsultationMode("");
    setSelectedSpecialities([]);
    setSortOption("");
  };

  useEffect(() => {
    fetchDoctors().then((data) => {
      console.log("Doctors fetched:", data);

      if (Array.isArray(data)) {
        setDoctors(data);
        const allSpecs = new Set();

        data.forEach((doc) => {
          if (doc.speciality && Array.isArray(doc.speciality)) {
            doc.speciality.forEach((s) => allSpecs.add(s.name.trim()));
          }
        });

        setSpecialities([...allSpecs]);
      } else {
        setDoctors([]);
        setSpecialities([]);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!doctors || doctors.length === 0) return;

    let result = [...doctors];

    const hasFilters =
      filters.search ||
      filters.mode ||
      filters.specialities.length > 0 ||
      filters.sort;

    if (hasFilters) {
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
    }

    setFilteredDoctors(result);
  }, [params, doctors]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="header">
        <Header data={doctors} onSearch={handleFilterChange} />
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
