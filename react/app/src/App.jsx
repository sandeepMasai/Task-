import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <Link to="/">Home</Link>

        <Link to="/courses">Courses</Link>

        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
