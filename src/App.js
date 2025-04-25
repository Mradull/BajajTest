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
  const [params] = useSearchParams();

  const [searchParams, setSearchParams] = useSearchParams();

  // Set initial state from query params
  useEffect(() => {
    const mode = searchParams.get("mode") || "";
    const sort = searchParams.get("sort") || "";
    const specialitiesFromParams = searchParams.getAll("speciality");

    setConsultationMode(mode);
    setSortOption(sort);
    setSelectedSpecialities(specialitiesFromParams);
  }, [searchParams]);

  // Update query params when filters change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
  
    // Only update filter-related params
    if (consultationMode) newParams.set("mode", consultationMode);
    else newParams.delete("mode");
  
    if (sortOption) newParams.set("sort", sortOption);
    else newParams.delete("sort");
  
    newParams.delete("speciality");
    selectedSpecialities.forEach((spec) => newParams.append("speciality", spec));
  
    // ✅ Don't touch the existing "search" param
    setSearchParams(newParams, { replace: true });
  }, [consultationMode, sortOption, selectedSpecialities]);
  
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
    setSearchParams({});
  };

  useEffect(() => {
    fetchDoctors().then(({ doctors, specialities }) => {
      setDoctors(Array.isArray(doctors) ? doctors : []);
      setSpecialities(Array.isArray(specialities) ? specialities : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setFilteredDoctors([]);
      return;
    }
    

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
        doc.specialities?.some((spec) =>
          filters.specialities.includes(spec.name)
        )
      );
    }

    if (filters.sort === "fees") {
      result.sort((a, b) => {
        const feesA = parseInt(a.fees.replace(/[^\d]/g, ""), 10);
        const feesB = parseInt(b.fees.replace(/[^\d]/g, ""), 10);
        return feesA - feesB;
      });
    } else if (filters.sort === "experience") {
      result.sort((a, b) => {
        const expA = parseInt(a.experience.replace(/[^\d]/g, ""), 10);
        const expB = parseInt(b.experience.replace(/[^\d]/g, ""), 10);
        return expB - expA;
      });
    }

    setFilteredDoctors(result);
  }, [doctors, consultationMode, selectedSpecialities, sortOption, searchParams]);

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
