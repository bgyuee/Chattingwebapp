import React from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
import SearchBox from "components/SearchBox";
import Tab from "components/Tab";
import { FaComment } from "react-icons/fa";
import "styles/chat.scss";

function Chats({userList}) {
  
  const a = <Link to={"#"}>Chats <span>{userList.length}</span></Link>
  const b = <Link to={"#"}>Edit</Link>
  return (
    <>
      <Header a={a} b={b} />
      <main className="chats_main">
        <SearchBox />
        <section className="main_section">
          <header className="blind">
            <h2>Friends</h2>
          </header>
          <ul>
          {userList.map((user,index) => 
              <li>
              <Link to={`/chatting/${user.id}`} state={{name: user.name, id: user.id, email: user.email, img: user.images, comment:user.comment}}>
                <span className="chats_img empty" style={{backgroundImage: `url(${user.images}`}}></span>
                <span className="chats_cont">
                  <span className="chats_name">{user.name}</span>
                  <span className="chats_latest">{user.comment[0]}</span>
                </span>
                <span className="chats_time">
                  <span>15</span>:<span>33</span>
                </span>
              </Link>
            </li>
          )};
          </ul>
        </section>
        <div className="chat_fa_btn">
          <Link to={"/"}>
            <FaComment />
          </Link>
        </div>
      </main>
      <Tab />
    </>
  );
}

export default Chats;
