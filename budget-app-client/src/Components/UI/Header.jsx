import "./Header.css";
import { Link } from "react-router-dom";
import authStore from "../../Store/authStore";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const store = authStore();
  const navigate = useNavigate();

  async function logoutHandler() {
    await store.logout();
    navigate("/login");
  }

  return (
    <div className="banner">
      <div className="banner__section"></div>
      <div className="banner__section">
        <div className="banner__text">BudgeMe</div>
      </div>
      <div className="banner__section">
        {store.loggedIn == true && (
          <>
            <button className="banner__settings" onClick={logoutHandler}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
