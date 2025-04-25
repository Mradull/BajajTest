export const fetchDoctors = async () => {
  try {
    const res = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
    const data = await res.json();
    
    console.log("Fetched data:", data);

    if (Array.isArray(data)) {
      // Extract specialities from the doctor data
      const specialitiesSet = new Set();
      data.forEach((doctor) => {
        if (doctor.speciality && Array.isArray(doctor.speciality)) {
          doctor.speciality.forEach((spec) => specialitiesSet.add(spec.name.trim()));
        }
      });
      
      const specialitiesList = [...specialitiesSet]; // Convert Set to Array
      return { doctors: data, specialities: specialitiesList };  // Return both doctors and specialities
    } else if (data && Array.isArray(data.doctors)) {
      // Handle case where the doctors list is inside a "doctors" key
      const specialitiesSet = new Set();
      data.doctors.forEach((doctor) => {
        if (doctor.speciality && Array.isArray(doctor.speciality)) {
          doctor.speciality.forEach((spec) => specialitiesSet.add(spec.name.trim()));
        }
      });

      const specialitiesList = [...specialitiesSet]; // Convert Set to Array
      return { doctors: data.doctors, specialities: specialitiesList };  // Return both doctors and specialities
    } else {
      console.error("Doctors data is not in the expected format:", data);
      return { doctors: [], specialities: [] };  // Return empty arrays if the format is not as expected
    }
  } catch (error) {
    console.error("Error fetching doctors data:", error);
    return { doctors: [], specialities: [] };  // Return empty arrays in case of any fetch errors
  }
};
