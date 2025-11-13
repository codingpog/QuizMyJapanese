import appLogo from "../assets/appLogo.png";
import { Link, useNavigate } from "react-router-dom";

function Header(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <header>
      <Link
        to="/dashboard"
        className="logo"
        onClick={(e) => {
          if (window.location.pathname === "/dashboard") {
            e.preventDefault(); // prevent navigation since you're already there
            window.location.reload(); // force reload only in that case
          }
        }}
      >
        <img src={appLogo} alt="app-logo" />
        <h2>Quiz My Japanese</h2>
      </Link>
      <nav>
        <Link to="/dashboard">Home</Link>
        <p> | </p>
        <Link to="/about">About</Link>
        <p> | </p>
        <Link to="/my-articles">Articles</Link>
      </nav>
    </header>
  );
}

export default Header;
