import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {}, [localStorage.getItem("user")]);

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header style={{ position: "relative" }}>
      <h1>Rapptr Labs</h1>
      {loggedInUser && (
        <button className="logout__btn todo__btn" onClick={onLogout}>
          logout
        </button>
      )}
    </header>
  );
};

export default Header;
