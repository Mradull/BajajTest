import React from "react";

const SpecialtyFilter = ({
  selectedSpecialities = [], // Default to empty array if undefined
  setSelectedSpecialities,
  specialitiesList = [],     // Default to empty array if undefined
}) => {
  const handleSpecialityChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedSpecialities((prev) => [...prev, value]);
    } else {
      setSelectedSpecialities((prev) => prev.filter((s) => s !== value));
    }
  };

  return (
    <div className="specialty-filter">
      {specialitiesList.map((speciality, index) => (
        <label key={index} className="checkbox-label">
          <input
            type="checkbox"
            value={speciality}
            checked={selectedSpecialities.includes(speciality)}
            onChange={handleSpecialityChange}
          />
          {speciality}
        </label>
      ))}
    </div>
  );
};

export default SpecialtyFilter;
