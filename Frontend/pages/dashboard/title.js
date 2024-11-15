import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Title = () => {
  const [courses,setCourses]=useState("")
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
    } catch (error) {
      setError("Error fetching Courses: " + error.message);
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
    <h1 className="primary" style={{ color: "#f2705a" }}>
      Courses Management
    </h1>
    {/* <p className="text-center lead">{`Currently ${courses.length} Courses(s) available`}</p>
    {error !== "" ? <h5>{error}</h5> : null} */}
  </div>
  );
};

export default Title;
