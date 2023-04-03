import React, { useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import Header from "components/Header";
import SearchBox from "components/SearchBox";
import Tab from "components/Tab";
import "styles/main.scss";
import "styles/header.scss";
import { MdSettingsSuggest,} from "react-icons/md";
import axios from "axios";

function Main({ userList }) {
  console.log(userList);
    const b = <Link to={"#"} style={{color: "#b6b5b1"}}>Manage</Link>;
    const c = <Link to={"#"}><MdSettingsSuggest /></Link>;

  const [users,setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async() => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(data);
    console.log(users);
  }

  return (
    <>
      <Header b={b} c={c} />
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
            {users.map((user, index) => (
              <li key={index}>
              <Link to={"/profile"}>
              <span className="profile_img empty"></span>
              <span className="profile_name">{user.name}</span>
              <span className="profile_messages">{user.company.catch}</span>
              </Link>
            </li>
            ))}
          </ul>
        </section>
      </main>
      <Tab />
    </>
  );
}

export default Main;
