import React, { useEffect } from "react";
import "../style/navbar.css";
import mujImg from "../assets/logoMUJ.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { isuserloggedin, setIsuserloggedin } = useAuth();

  return (
    <div className='navbar-full'>
      <nav>
        <img src={mujImg} alt='' className='muj-img' />
        <ul className='nav-items'>
          <li
            onClick={() => {
              isuserloggedin ? navigate("/") : navigate("/login");
            }}
          >
            {isuserloggedin ? "Dashboard" : "Home"}
          </li>
          <li onClick={() => navigate("/contact")}>Contact</li>

          <li onClick={() => navigate("/faq")}>FAQ</li>

          <li onClick={() => navigate("/alumni-reg")}>Alumni</li>

          <li
            onClick={() => {
              setIsuserloggedin(false);
            }}
          >
            {isuserloggedin ? "Logout" : null}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
