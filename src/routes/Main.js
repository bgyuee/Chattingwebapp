import React from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
import SearchBox from "components/SearchBox";
import Tab from "components/Tab";
import "styles/main.scss";
import "styles/header.scss";
import { MdSettingsSuggest,} from "react-icons/md";


function Main({ userList, userObj, statemessage }) {
  console.log(userList);
    const a = <>Friends <span>{userList.length}</span></>
    const b = <Link to={"#"} style={{color: "#b6b5b1"}}>Manage</Link>;
    const c = <Link to={"#"}><MdSettingsSuggest /></Link>;
  return (
    <>
      <Header a={a} b={b} c={c} />
      <main className="main_home">
        <SearchBox />
        <section className="main_section scroll">
          <div className="Myprofile">
            <h2>my Profile</h2>
            <ul>
            <li>
                <Link to={`/myprofile`}>
                  <span className="profile_img empty" style={userObj.photoURL? {backgroundImage:`url(${userObj.photoURL})`} : {backgroundImage:''}}></span>
                  <span className="profile_name">{userObj.displayName}</span>
                  <span className="profile_messages">{statemessage}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="Friends">
            <h2>Friedns</h2>
            <ul>
            {userList.map((user,index) => 
                <li key={user.id}>
                <Link to={`/profile/${user.id}`} state={
                  {
                    name: user.name,
                    id: user.id,
                    email: user.email,
                    img: user.images,
                    comment:user.comment,
                    index:index,
                    profilemessages:user.profilemessages
                  }}>
                  <span className="profile_img empty" style={{backgroundImage: `url(${user.images}`}}></span>
                  <span className="profile_name">{user.name}</span>
                  <span className="profile_messages">{user.profilemessages}</span>
                </Link> 
              </li>
              )}
            </ul>
          </div>
        </section>
      </main>
      <Tab />
    </>
  );
}

export default Main;
