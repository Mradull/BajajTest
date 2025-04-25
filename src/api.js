export const fetchDoctors = async () => {
    try {
      const res = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
      const data = await res.json();
      
      // Log the data to inspect its structure
      console.log("Fetched data:", data);
  
      // Assuming the data is an array directly
      if (Array.isArray(data)) {
        return data;  // Directly returning the data if it's an array
      } else if (data && Array.isArray(data.doctors)) {
        return data.doctors;  // If the doctors are inside a "doctors" key
      } else {
        console.error("Doctors data is not in the expected format:", data);
        return [];  // Return an empty array if format is not as expected
      }
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      return [];  // Return an empty array in case of any fetch errors
    }
  };
  