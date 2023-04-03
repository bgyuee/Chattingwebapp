import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "components/Header";
import { FaComment, FaPencilAlt, FaUser } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import "styles/profile.scss";

function Myprofile() {
  const location = useLocation; //로케이션객체를 가져온다 //주소창에 데이터를 받는다
  console.log(location);
  const a = <Link to="#" className="blind">Profile</Link>
  const b = <Link to="/"><HiOutlineX /></Link>
  const c = <Link to="#"><FaUser /></Link>

  return (
    <body className="profile_body">
      <Header a={a} b={b} c={c}/>
      <main>
        <section className="background">
          <h2 className="blind">My porifile background image</h2>
        </section>
        <section className="profile">
          <h2 className="blind">my profile info</h2>
          <div className="profile_imges empty"></div>
          <div className="profile_cont">
            <span className="profile_name">박규엽</span>
            <input
              type="email"
              className="profile_email"
              placeholder="bgyuee@gmail.com"
            />
            <ul className="profile_menu">
              <li>
                <Link for={"#"}>
                  <span className="icon">
                    <FaComment />
                  </span>
                  My Chatroom
                </Link>
              </li>
              <li>
                <Link for={"#"}>
                  <span className="icon">
                    <FaPencilAlt />
                  </span>
                  Edit Profile
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </body>
  );
}

export default Myprofile;
