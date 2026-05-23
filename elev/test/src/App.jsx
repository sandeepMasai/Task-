import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import CourseDetails from "./pages/CourseDetails";
import SavedCourses from "./pages/SavedCourses";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/saved" element={<SavedCourses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
