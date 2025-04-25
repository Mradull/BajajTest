import React, { useState } from 'react';

const SpecialtyFilter = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const specialties = [
    "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", 
    "ENT", "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist", 
    "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist", 
    "Psychiatrist", "Urologist", "Dietitian/Nutritionist", "Psychologist", 
    "Sexologist", "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
  ];

  const handleCheckboxChange = (event) => {
    const specialty = event.target.value;
    setSelectedSpecialties(prevState =>
      prevState.includes(specialty)
        ? prevState.filter(item => item !== specialty)
        : [...prevState, specialty]
    );
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter specialties based on search term
  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Filter by Specialty</h3>
      
      {/* Search Box for Specialty Filter */}
      <input 
        type="text"
        placeholder="Search specialties..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />

      {/* Specialty List */}
      <div className="speciality-list">
        {filteredSpecialties.map((specialty, index) => (
          <label key={index}>
            <input 
              type="checkbox" 
              id={`filter-specialty-${specialty.replace(/\s+/g, '-')}`}
              value={specialty}
              checked={selectedSpecialties.includes(specialty)}
              onChange={handleCheckboxChange}
            />
            {specialty}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyFilter;
