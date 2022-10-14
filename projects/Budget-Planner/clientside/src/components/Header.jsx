import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import NavBar from "./NavBar"; 
import Avatars from "./Avatars";
const Header = () => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        position: 'relative',
        margin: '80px auto',
      }}
    >
      <NavBar />
      <Avatars />

        <span
          className="mr-auto cursor-pointer"
          style={{ cursor: 'pointer', position: 'absolute', right: 0 }}
        >
      <Link to="/">
          <img src={Logo} alt="logo" width={180} />
      </Link>
        </span>
    </nav>
  );
};

export default Header;
