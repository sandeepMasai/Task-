import { Link } from "react-router-dom";

function CourseCard({ course, saveCourse }) {
  return (
    <div style={style.card}>
      <h2>{course.title}</h2>
      <p>{course.category}</p>
      <p>{course.duration}</p>
      <p>{course.level}</p>
      <p>₹ {course.price}</p>

      <Link to={`/courses/${course.id}`}>
        <button>View Details</button>
      </Link>

      <button onClick={() => saveCourse(course)}>Save Course</button>
    </div>
  );
}

export default CourseCard;

const style = {
  card: {
    border: "1px solid red",
    padding: "20px",
    margin: "10px",
  },
};
