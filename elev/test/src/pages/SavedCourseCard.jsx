import React from "react";

function SavedCourseCard({ course }) {
  return (
    <div style={styles.card}>
      <h2>{course.title}</h2>
      <p>{course.category}</p>
      <p>{course.duration}</p>
      <p>{course.level}</p>
      <p>₹ {course.price}</p>
      <p>{course.description}</p>
    </div>
  );
}

export default SavedCourseCard;

const styles = {
  card: {
    border: "1px solid blue",
    padding: "20px",
    margin: "10px",
    borderRadius: "10px",
  },
};
