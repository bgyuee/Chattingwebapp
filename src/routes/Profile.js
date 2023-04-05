import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "components/Header";
import { FaUser, FaComment, FaMicrophone, FaGift } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import "styles/profile.scss";

function Profile() {
  const location = useLocation();
  console.log(location);
  const { name, id, email, img, comment, index } = location.state;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const a = <div className="blind">Profile</div>;
  const b = (
    <div
      onClick={handleGoBack}
      style={{ cursor: "pointer" }}
    >
      <HiOutlineX />
    </div>
  );
  const c = <div><FaUser /></div>;

  return (
    <body className="profile_body">
      <Header a={a} b={b} c={c} />
      <main>
        <section className="background" style={{ backgroundImage: `url(${img}` }}>
          <h2 className="blind">My porifile background image</h2>
        </section>
        <section className="profile">
          <h2 className="blind">my profile info</h2>
          <div className="profile_imges empty" style={{ backgroundImage: `url(${img}` }}></div>
          <div className="profile_cont">
            <span className="profile_name">{name}</span>
            <input
              type="email"
              className="profile_email"
              placeholder={email}
            />
            <ul className="profile_menu">
              <li>
                <Link to={`/chatting/${index}`} state={{name, id, email, img, comment, index}}>
                  <span className="icon">
                  <FaComment />
                  </span>
                  Chatting
                </Link>
              </li>
              <li>
                <Link to={"#"}>
                  <span className="icon">
                    <FaMicrophone />
                  </span>
                  Voice
                </Link>
              </li>
              <li>
                <Link to={"#"}>
                  <span className="icon">
                    <FaGift />
                  </span>
                 Gift
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </body>
  );
}

export default Profile;
