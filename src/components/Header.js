import React, { useState, useEffect } from "react";
import { FaPlane, FaWifi, FaMoon, FaBluetoothB, FaBatteryFull } from "react-icons/fa";
import "../styles/header.scss";

function Header({ a, b, c, style }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, -3));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString().slice(0, -3));
    }, 60000); // 1분마다 갱신
    return () => clearInterval(intervalId);
  }, []);

  if (a === undefined) {
    a = "";
  }
  if (b === undefined) {
    b = "";
  }
  if (c === undefined) {
    c = "";
  }

  return (
    <div className="header" style={style}>
      <div className="status_bar">
        <div className="left_item">
          <FaPlane />
          <FaWifi />
        </div>
        <div className="center_item">{time}</div>
        <div className="right_item">
          <FaMoon />
          <FaBluetoothB />
          <span>
            100<span>%</span>
          </span>
          <FaBatteryFull />
        </div>
      </div>
      <div className="title_bar">
        <h1>{a}</h1>
        <div className="left_item">{b}</div>
        <div className="right_item">{c}</div>
      </div>
    </div>
  );
}

export default Header;
