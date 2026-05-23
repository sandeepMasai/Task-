import { useParams } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React",
    category: "Frontend",
    duration: "6 Weeks",
    level: "Beginner",
    price: 1999,
    description: "learn react form new course",
  },
  {
    id: 2,
    title: "Nodejs API",
    category: "Backend",
    duration: "6 Weeks",
    level: "Intermediate",
    price: 4000,
    description: "learn Nodejs form new course",
  },
  {
    id: 3,
    title: "Machine learning",
    category: "AI",
    duration: "6 Weeks",
    level: "Advanced",
    price: 3000,
    description: "learn Machine learning form new course",
  },
  {
    id: 4,
    title: "Data An",
    category: "Data",
    duration: "5 Weeks",
    level: "Beginner",
    price: 2000,
    description: "learn react form new course",
  },
];

function CourseDetails() {
  const { courseId } = useParams();

  const course = courses.find((item) => item.id === Number(courseId));

  if (!course) {
    return <h1>Course Not Found</h1>;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.category}</p>
      <p>{course.duration}</p>
      <p>{course.level}</p>
      <p>{course.price}</p>
      <p>{course.description}</p>
    </div>
  );
}

export default CourseDetails;
