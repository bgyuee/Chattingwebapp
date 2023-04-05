import React from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
import SearchBox from "components/SearchBox";
import Tab from "components/Tab";
import { FaAddressBook, FaQrcode, FaEnvelope } from "react-icons/fa";
import { MdMobileScreenShare } from "react-icons/md";
import 'styles/find.scss'

function find() {

  const a = <>Find</>
  const b = <Link to={"#"}>Edit</Link>

  return (
    <>
      <Header a={a} b={b}/>
      <main className="find_main">
        <SearchBox />
        <ul className="find_method">
          <li>
            <Link>
              <FaAddressBook />
              Find
            </Link>
          </li>
          <li>
            <Link>
              <FaQrcode />
              QR Code
            </Link>
          </li>
          <li>
            <Link>
              <MdMobileScreenShare />
              Shake
            </Link>
          </li>
          <li>
            <Link>
              <FaEnvelope />
              Invite via SNS
            </Link>
          </li>
        </ul>
        <section className="recommend_section">
          <header>
            <h2>Recommend Frieds</h2>
          </header>
          <ul>
            <li>You Have no recommend frieds.</li>
          </ul>
        </section>
      </main>
      <Tab />
    </>
  );
}

export default find;
