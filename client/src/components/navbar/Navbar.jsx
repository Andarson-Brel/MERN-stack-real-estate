import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const authContext = useContext(AuthContext);

  const { currentUser } = authContext || {};
  const handleIsOpen = () => {
    setIsopen((prev) => !prev);
  };
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="left">
          <a className="logo">
            <img src="./logo.png" alt="" />
            <span>A-State</span>
          </a>
          <Link to={"/"}>Home</Link>
          <Link to={"/list"}>Listings</Link>
          <Link to={"/about"}>About Us</Link>
          {/* <Link to={"contact"}>Contact</Link> */}
          <Link to={"/agents"}>Agents</Link>
        </div>
        <div className="right">
          {currentUser ? (
            <div className="userCont">
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt=""
              />
              <span>{currentUser.userName}</span>

              <Link to="/profile" className="profile">
                {number > 0 && <div className="notification">{number}</div>}
                Profile
              </Link>
            </div>
          ) : (
            <>
              <Link to={"/login"}>Sign In </Link>
              <Link to={"/register"} className="register-btn">
                Sign Up
              </Link>
            </>
          )}
          <div className="menu-icon">
            <img
              src="./menu.png"
              alt=""
              type="button"
              onClick={handleIsOpen}
              className={`${isOpen ? " img-active" : " imginactive"}`}
            />
          </div>
          <div className={`${isOpen ? "menu active" : "menu"}`}>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
            <Link to={"/agents"}>Agents</Link>
            {currentUser ? (
              <Link to="/profile" className="profile">
                {/* <div className="notification">3</div> */}
                Profile
              </Link>
            ) : (
              <>
                <Link to={"/login"}>Sign In</Link>
                <Link to={"/register"}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
