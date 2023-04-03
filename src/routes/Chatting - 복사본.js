import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "components/Header";
import { FaPlus, FaSmile, FaMicrophone, FaAngleLeft, FaBars } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from 'fbase';
import "styles/chatting.scss";

function Chatting() {

  /*style*/
  const a = <>Friends <span>1</span></>;
  const bStyle = { color: "#000", opacity: 1, fontSize: 24, paddingLeft: 5 };
  const b = <Link to={"/chats"} style={bStyle}><FaAngleLeft /></Link>;
  const cStyle = { color: "#000", fontSize: 24};
  const c = <><Link to={"#"} style={cStyle}><HiMagnifyingGlass /></Link><Link to={"#"} style={cStyle}><FaBars /></Link></>;
  const Headerstyle = { color: "#000", backgroundColor: "#a1c0d5", borderBottom: "1px solid #96acba"};

  /*데이터 받아옴*/
  const location = useLocation();
  console.log(location);
  const {name, id, email, img, comment, index} = location.state;

  //comment배열에서 각각의 comment 적용
  const commentList = comment.map((comment, index) => (
    <span key={index} className="chat">
      {comment}
    </span>
  ));

  /* 채팅입력값 */
  const [talk, setTalk] = useState('');
  
  const onChange = (e) => {
    console.log(e);
    const {target:{value}} = e;
    setTalk(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), {
        text: talk,
        createdAt: Date.now(),
        // creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTalk('');
  }

  const [chatBox, setChatbox ] = useState([]);
  console.log('chatBox->', chatBox);
  useEffect(() => {
    const printDocs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const docs = querySnapshot.docs.map(doc => doc.data());
        setChatbox(docs);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };
    printDocs(); // call the function here
  }, []);
 
  
  return (
    <body>
      <Header style={Headerstyle} a={a} b={b} c={c}/>
      <main className="chatiing_main">
        <span className="date_info">Thursday,March 23, 2023</span>
        <div className="chat_box my">
          {chatBox.reverse().map((talk,index) => 
            <span className="chat" key={index}>{talk.text}</span>
          )}
          
          <span className="chat_time">
            <span>15</span>:<span>33</span>
          </span>
        </div>
        <div className="chat_box other">
          <div className="other_info">
           <Link to={`/profile/${index}`} state={{name,id,email,img,comment,index}}>
              <span className="profile_img empty" style={{backgroundImage: `url(${img}`}} ></span>
            </Link>
            <span className="profile_name">{name}</span>
          </div>
          {commentList}
          <span className="chat_time">
            <span>17</span>:<span>33</span>
          </span>
        </div>
      </main>
      <footer>
        <span className="plus_btn">
          <Link>
            <FaPlus />
          </Link>
        </span>
        <form action="/" method="post" onSubmit={onSubmit}>
          <fieldset className="text_box">
            <legend className="blind">채팅 입력창</legend>
            <label for="chatting" className="blind">
              채팅입력
            </label>
            <input type="text" id="chatting" className="text_field" value={talk} onChange={onChange}/>
            <span className="emoticon_btn">
              <Link to={"#"}>
                <FaSmile />
              </Link>
            </span>
            <span className="voice_btn">
              <Link to={"#"}>
                <FaMicrophone />
              </Link>
            </span>
          </fieldset>
        </form>
      </footer>
    </body>
  );
}

export default Chatting;
