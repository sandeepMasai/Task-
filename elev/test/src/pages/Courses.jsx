import { useMemo, useState, useRef } from "react";
import CourseCard from "./CourseCard";

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

function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [save, setSave] = useState([]);

  const inputRef = useRef();

  const saveCourse = (course) => {
    setSave([...save, course]);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === "All" || course.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <div>
      <h2>Courses Page</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Data">Data</option>
        <option value="AI">AI</option>
      </select>

      {filteredCourses.map((course) => (
        <CourseCard key={course.id} course={course} saveCourse={saveCourse} />
      ))}
    </div>
  );
}

export default Courses;
