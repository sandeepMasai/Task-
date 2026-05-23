import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>welcome to mini course dashboard </h1>
      <p>explore course</p>
      <Link to={"/courses"}>Explore Course</Link>
    </div>
  );
}

export default Home;
