import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      404 Not Found page
      <h2>
        <Link to={"/"}>
          <button>Back to Home</button>
        </Link>
      </h2>
    </div>
  );
}

export default NotFound;
