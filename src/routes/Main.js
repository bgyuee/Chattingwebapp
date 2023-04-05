import React from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
import SearchBox from "components/SearchBox";
import Tab from "components/Tab";
import "styles/main.scss";
import "styles/header.scss";
import { MdSettingsSuggest,} from "react-icons/md";


function Main({ userList }) {
  console.log(userList);
    const a = <>Friends <span>1</span></>
    const b = <Link to={"#"} style={{color: "#b6b5b1"}}>Manage</Link>;
    const c = <Link to={"#"}><MdSettingsSuggest /></Link>;
  return (
    <>
      <Header a={a} b={b} c={c} />
      <main>
        <SearchBox />
        <section className="main_section">
          <header>
            <h2>my Profile</h2>
          </header>
          <ul>
          <li>
              <Link to={`/myprofile`}>
                <span className="profile_img empty"></span>
                <span className="profile_name">박규엽</span>
                <span className="profile_messages">
                  집에 가고싶다
                </span>
              </Link>
            </li>
          </ul>
        </section>
        <section className="main_section">
          <header>
            <h2>Friedns</h2>
          </header>
          <ul>
          {userList.map((user,index) => 
               <li key={index}>
               <Link to={"/profile"} state={{name: user.name, id: user.id, email: user.email, img: user.images, comment:user.comment, index:index}}>
                 <span className="profile_img empty" style={{backgroundImage: `url(${user.images}`}}></span>
                 <span className="profile_name">{user.name}</span>
                 <span className="profile_messages">{user.profilemessages}</span>
               </Link> 
             </li>
            )}
          </ul>
        </section>
      </main>
      <Tab />
    </>
  );
}

export default Main;
