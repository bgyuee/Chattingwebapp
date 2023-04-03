import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "components/Header";
import { FaPlus, FaSmile, FaMicrophone, FaAngleLeft, FaBars } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { collection, addDoc, onSnapshot, query, orderBy} from "firebase/firestore";
import { db } from 'fbase';
import Chatbox from "components/Chatbox";
import "styles/chatting.scss";


function Chatting({userObj}) {
  console.log(userObj);
  /*style*/
  const a = <>Friends <span>1</span></>;
  const bStyle = { color: "#000", opacity: 1, fontSize: 24, paddingLeft: 5 };
  const b = <Link to={"/chats"} style={bStyle}><FaAngleLeft /></Link>;
  const cStyle = { color: "#000", fontSize: 24};
  const c = <><Link to={"#"} style={cStyle}><HiMagnifyingGlass /></Link><Link to={"#"} style={cStyle}><FaBars /></Link></>;
  const Headerstyle = { color: "#000", backgroundColor: "#a1c0d5", borderBottom: "1px solid #96acba"};
   /*링크로 데이터 받아옴*/
   const location = useLocation();
   const {name, id, email, img, comment, index} = location.state;
 
   //comment배열에서 각각의 comment 적용 일단 상대방채팅에 적용
   const commentList = comment.map((comment, index) => (
     <span key={index} className="chat">
       {comment}
     </span>
   ));



  /* 채팅입력값 */
  const [talk, setTalk] = useState(''); //firebase안으로 데이터를 넣는다
  const [talks, setTalks] = useState([]); //querySnapshot에서 데이터들을 배열로 하나하나 들고오겠다.
  console.log(talks);
  
  // talks섹션안에 있는 db들을 가져오고 createdAt값들을 내림차순으로 정렬한다 desc는 내림차순 asc는 오름차순
  useEffect(() => {
    const q = query(collection(db, "talks"),
              orderBy("createdAt", "asc")); //createdAt라는 속성을 오름차순으로 정렬
    const unsubscribe = onSnapshot(q, (querySnapshot) => { //데이터 실시간 수신 (querySnapshot)안에 스냅샷찍은게 다들어온다
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(), id: doc.id});
      });
      setTalks(newArray);
    });
  }, []);
  
  const onChange = (e) => {
    console.log(e);
    const {target:{value}} = e;
    setTalk(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!talk) return; //talk내용 없으면 하지마라
    try { //성공시
      const docRef = await addDoc(collection(db, "talks"), {// talks라는 컬렉션을 만듬
        text: talk,
        createdAt: Date.now(),
        creatorId: userObj.uid, //문서를 누가 작성했느냐를 알기위해서 Id를 지정해준다.
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) { //실패시
      console.error("Error adding document: ", e);
    }
    setTalk('');
  }

  
  return (
    <body className="chatting_body">
      <Header style={Headerstyle} a={a} b={b} c={c}/>
      <main className="chatiing_main">
        <span className="date_info">Thursday,March 23, 2023</span>
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
        {talks.map(talk => 
        <Chatbox className="chat_box my" talkObj={talk} isOwner={talk.creatorId === userObj.uid} />
         )}
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
