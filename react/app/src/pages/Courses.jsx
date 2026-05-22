import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../data";

function Courses() {
  return (
    <div>
      <h1>Courses Page</h1>

      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>

          <p>Duration: {course.duration}</p>

          <Link to={`/courses/${course.id}`}>View Details</Link>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Courses;
