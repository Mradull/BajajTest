// src/components/FilterComponent.jsx
import React from "react";
import "./FilterComponent.css";
import SpecialtyFilter from "./SpecialtyFilter";

export default function FilterComponent({
  selectedSpecialities,
  setSelectedSpecialities,
  consultationMode,
  setConsultationMode,
  sortOption,
  setSortOption,
  specialitiesList,
  clearFilters,
}) {
  const handleSpecialityChange = (spec) => {
    if (selectedSpecialities.includes(spec)) {
      setSelectedSpecialities(selectedSpecialities.filter((s) => s !== spec));
    } else {
      setSelectedSpecialities([...selectedSpecialities, spec]);
    }
  };

  return (
    <div className="filters-container">
      <div className="sort-section">
        <h3>Sort by</h3>
        <label>
          <input
            type="radio"
            name="sort"
            value="fees"
            checked={sortOption === "fees"}
            onChange={(e) => setSortOption(e.target.value)}
          />
          Fees: Low-High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="experience"
            checked={sortOption === "experience"}
            onChange={(e) => setSortOption(e.target.value)}
          />
          Experience: Most Experience first
        </label>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3>Filters</h3>
          <button onClick={clearFilters} className="clear-btn">Clear All</button>
        </div>

        <div className="filter-group">
          <h4>Mode of Consultation</h4>
          <label>
            <input
              type="radio"
              name="mode"
              value="Video"
              checked={consultationMode === "Video"}
              onChange={(e) => setConsultationMode(e.target.value)}
            />
            Video Consultation
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="In-clinic"
              checked={consultationMode === "In-clinic"}
              onChange={(e) => setConsultationMode(e.target.value)}
            />
            In-clinic Consultation
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value=""
              checked={consultationMode === ""}
              onChange={(e) => setConsultationMode(e.target.value)}
            />
            All
          </label>
        </div>

        <div className="filter-group">
          <h4>Specialities</h4>
          <SpecialtyFilter 
            selectedSpecialties={selectedSpecialities} 
            setSelectedSpecialties={setSelectedSpecialities} 
            specialitiesList={specialitiesList}
          />
        </div>
      </div>
    </div>
  );
}
