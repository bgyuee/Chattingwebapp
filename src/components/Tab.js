import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaComment } from "react-icons/fa";
import { MdSearch, MdMoreHoriz } from "react-icons/md";
import "../styles/tab.scss";

function Tab() {
  const location = useLocation();

  const getSelectedTab = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "home";
      case "/chats":
        return "chats";
      case "/find":
        return "find";
      case "/more":
        return "more";
      default:
        return "";
    }
  };

  const selected = getSelectedTab();

  return (
    <nav className="tab_bar">
      <ul>
        <li className={selected === "home" ? "selected" : ""}>
          <Link to={"/"}>
            <FaUser />
          </Link>
        </li>
        <li className={selected === "chats" ? "selected" : ""}>
          <Link to={"/chats"}>
            <FaComment />
          </Link>
        </li>
        <li className={selected === "find" ? "selected" : ""}>
          <Link to={"/find"}>
            <MdSearch />
          </Link>
        </li>
        <li className={selected === "more" ? "selected" : ""}>
          <Link to={"/more"}>
            <MdMoreHoriz />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tab;
