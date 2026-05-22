import React from "react";

import { useParams, Link } from "react-router-dom";

import { courses } from "../data";

function CourseDetails() {
  const { courseId } = useParams();

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <div>
        <h1>Course Not Found</h1>

        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{course.title}</h1>

      <p>Duration: {course.duration}</p>

      <p>{course.description}</p>
    </div>
  );
}

export default CourseDetails;
