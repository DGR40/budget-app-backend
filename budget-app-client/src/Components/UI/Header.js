import "./Header.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="banner">
      <div className="banner__section"></div>
      <div className="banner__section">
        <div className="banner__text">BudgeMe</div>
      </div>
      <div className="banner__section">
        <Link to="/settings" class="banner__settings">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Header;
