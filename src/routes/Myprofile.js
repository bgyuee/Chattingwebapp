import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "components/Header";
import { FaComment, FaPencilAlt, FaUser, FaCamera, FaCheck} from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import "styles/profile.scss";
import { updateProfile } from "firebase/auth";
import { db, storage } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import Background from "components/Background";
import { addDoc, collection } from "firebase/firestore";

function Myprofile({userObj, statemessage, setStatemessage}) {

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState(userObj.photoURL);
  
  const [profileImageok,setProfileImageok] = useState(false);
  const [profileok, setProfielok] = useState(false);

  console.log('userObj ->>>>', userObj);
  // const location = useLocation; //로케이션객체를 가져온다 //주소창에 데이터를 받는다
  // console.log(location);
  const a = <Link to="#" className="blind">Profile</Link>
  const b = <Link to="/"><HiOutlineX style={{color:"#000"}} /></Link>
  const c = <Link to="#"><FaUser /></Link>

  const onChange = (e) => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  }
  
  const newStatemessage = (e) => {
    const message = e.target.value;
    setStatemessage(message);
  }

  const onFilechange = (e) => {
    const {target:{files}} = e;
    
    const theFile = files[0]; //현재 업로드한 이미지

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => { //파일을 다 읽고 나서 파라미터에 데이터가 들어온다
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

 const onSubmit = async (e) => {
  e.preventDefault();
  try {
    let attachmentUrl = "";
  if (attachment !== userObj.photoURL) { // 새 이미지를 업로드한 경우에만 실행한다
    const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(storageRef, attachment, 'data_url');
    attachmentUrl = await getDownloadURL(ref(storage, response.ref));
  }
  await updateProfile(userObj, {
    displayName: newDisplayName,
    photoURL: attachmentUrl || userObj.photoURL, // 업로드한 이미지가 없는 경우, 기존 이미지 URL을 사용한다
  });
  
  const docRef = await addDoc(collection(db, `${userObj.uid}statemessage`), {
    creatorId: userObj.uid,
    createdAt: Date.now(),
    statemessage:statemessage
  });
  
  } catch(e) {
    console.error("Error adding document: ", e);
  }
  
}

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok) {
      setAttachment("");
      if(attachment !=="") {
        const desertRef = ref(storage, attachment);
        await deleteObject(desertRef);
        await updateProfile(userObj, {
          photoURL: "",
        })
      }
    }
    }


  return (
    <div className="profile_body">
      <Header a={a} b={b} c={c} style={{backgroundColor : "transparent"}}/>
      <main>
        <Background userObj={userObj} />
        <section className="profile">
          <h2 className="blind">my profile info</h2>
          <div className="profile_imges empty" style={attachment? {backgroundImage:`url(${attachment})`} : {backgroundImage:''}}>
          {profileok && <span className="profile_images_icon" onClick={() => setProfileImageok(prev => !prev)}><FaCamera /></span>}
          </div>
          <div className="profile_cont">
            {attachment && profileImageok && 
            <button className="profileImg_btn" onClick={onDeleteClick}>삭제</button>
            }
            <div className="profie__info">
              <span className="profile_name">{newDisplayName}</span>
              <span className="statemessage">{statemessage}</span>
            </div>
            {profileImageok && profileok&& <label className="profileImg_add" htmlFor="profileImg_add">찾아보기</label>}
            <form onSubmit={onSubmit}>
               {profileok&& 
                <>
                   <input type="text" className="input_name" onChange={onChange} placeholder="이름을 입력해주세요" />
                   <input type="text" className="state_message" onChange={newStatemessage} placeholder="상태메세지를 입력해주세요" />
                </>
               }
              
              <input id="profileImg_add" className="blind" type="file" accept="image/*" onChange={onFilechange} />
            </form>
            <ul className="profile_menu">
              <li>
                <Link>
                  <span className="icon">
                    <FaComment />
                  </span>
                  나와의 채팅
                </Link>
              </li>
              <li onClick={() => setProfielok(prev => !prev)}>
                {!profileok ? (
                  <Link>
                  <span className="icon">
                    <FaPencilAlt />
                  </span>
                  프로필 수정
                </Link>
                ):(
                  <Link onClick={onSubmit}>
                  <span className="icon">
                    <FaCheck />
                  </span>
                  완료
                </Link>
                )}
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Myprofile;
