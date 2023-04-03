import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaComment } from "react-icons/fa";
import { MdSearch, MdMoreHoriz } from "react-icons/md";
import "../styles/tab.scss";

function tab() {
  return (
    <nav className="tab_bar">
      <ul>
        <li><Link to={"/"}><FaUser /></Link></li>
        <li><Link to={"/chats"}><FaComment /></Link></li>
        <li><Link to={"/find"}><MdSearch /></Link></li>
        <li><Link to={"/more"}><MdMoreHoriz /></Link></li>
      </ul>
    </nav>
  );
}

export default tab;
