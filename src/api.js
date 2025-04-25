export const fetchDoctors = async () => {
  try {
    const res = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
    const data = await res.json();
    
    console.log("Fetched data:", data);

    const doctorList = Array.isArray(data)
      ? data
      : Array.isArray(data.doctors)
        ? data.doctors
        : [];

    const specialitiesSet = new Set();
    doctorList.forEach((doctor) => {
      if (doctor.specialities && Array.isArray(doctor.specialities)) {
        doctor.specialities.forEach((spec) => {
          if (spec?.name) {
            specialitiesSet.add(spec.name.trim());
          }
        });
      }
    });

    const specialitiesList = [...specialitiesSet];

    return { doctors: doctorList, specialities: specialitiesList };
  } catch (error) {
    console.error("Error fetching doctors data:", error);
    return { doctors: [], specialities: [] };
  }
};
