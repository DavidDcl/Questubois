import { FiMenu } from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/images/logo.png";

function NavBar() {
  const [openBurger, setOpenBurger] = useState(false);
  const activeLink = "text-blondbeercolor";
  const normalLink = "";

  const closeBurgerMenu = () => {
    setOpenBurger(false);
  };

  return (
    <header className="flex justify-between items-center h-20 bg-almostblack drop-shadow-lg relative z-50">
      <div className="ml-5 p-2 lg:ml-7 lg:mr-7">
        <NavLink to="/" onClick={closeBurgerMenu}>
          <img
            className="w-96 p-2 mr-5 object-contain h-20"
            src={logo}
            alt="T'es où ?!"
          />
        </NavLink>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-title text-almostwhite m-2">Questubois</h1>
      </div>
      <nav className="w-screen mr-5" />
      <ul
        className={`${
          openBurger
            ? "absolute top-20 right-0 px-6 py-2 bg-almostblack"
            : "hidden"
        } text-almostwhite lg:flex lg:justify-end lg:w-auto`}
      >
        <NavLink
          to="/"
          onClick={closeBurgerMenu}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <li className="lg:px-7 py-2 text-2xl hover:text-blondbeercolor hover:scale-110">
            Home
          </li>
        </NavLink>
        <NavLink
          to="/Profil"
          onClick={closeBurgerMenu}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <li className="lg:px-7 py-2 text-2xl hover:text-blondbeercolor hover:scale-110">
            QuestYourMood
          </li>
        </NavLink>
        <NavLink
          to="/QuestUChoose"
          onClick={closeBurgerMenu}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <li className="lg:px-7 py-2 text-2xl checked:bg-blondbeercolor hover:text-blondbeercolor hover:scale-110">
            QuestYourFood
          </li>
        </NavLink>
        <NavLink
          to="/ToutesLesBieres"
          onClick={closeBurgerMenu}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <li className="lg:px-7 py-2 text-2xl hover:text-blondbeercolor hover:scale-110">
            AllOurBeer
          </li>
        </NavLink>
      </ul>
      <div className="p-5">
        <FiMenu
          className="lg:hidden block h-10 w-10 cursor-pointer text-blondbeercolor"
          onClick={() => setOpenBurger(!openBurger)}
        />
      </div>
    </header>
  );
}

export default NavBar;
