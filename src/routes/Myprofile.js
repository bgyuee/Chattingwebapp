import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "components/Header";
import { FaComment, FaPencilAlt, FaUser } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import "styles/profile.scss";
import { updateProfile } from "firebase/auth";
import { storage } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import Background from "components/Background";

function Myprofile({userObj}) {

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState(userObj.photoURL);

  console.log('userObj ->>>>', userObj);
  // const location = useLocation; //로케이션객체를 가져온다 //주소창에 데이터를 받는다
  // console.log(location);
  const a = <Link to="#" className="blind">Profile</Link>
  const b = <Link to="/"><HiOutlineX /></Link>
  const c = <Link to="#"><FaUser /></Link>

  const onChange = (e) => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  }
  
  const onFilechange = (e) => {
    const {target:{files}} = e;
    
    const theFile = files[0]; //현재 업로드한 이미지
    console.log('여기기기기기', theFile); //jpg

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => { //파일을 다 읽고 나서 파라미터에 데이터가 들어온다
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

 const onSubmit = async (e) => {
  e.preventDefault();
  let attachmentUrl = "";
  if (attachment !== userObj.photoURL) { // 새 이미지를 업로드한 경우에만 실행한다
    const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(storageRef, attachment, 'data_url');
    attachmentUrl = await getDownloadURL(ref(storage, response.ref));
  }
  await updateProfile(userObj, {
    displayName: newDisplayName,
    photoURL: attachmentUrl || userObj.photoURL // 업로드한 이미지가 없는 경우, 기존 이미지 URL을 사용한다
  });
}

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
   if(ok) {
    if(attachment !=="") {
      const desertRef = ref(storage, attachment);
      await deleteObject(desertRef);
      await updateProfile(userObj, {
        photoURL: "",
      })
    }
    setAttachment("");
   }
  }


  return (
    <div className="profile_body">
      <Header a={a} b={b} c={c} style={{backgroundColor : "transparent"}}/>
      <main>
        <Background userObj={userObj} />
        <section className="profile">
          <h2 className="blind">my profile info</h2>
          <div className="profile_imges empty" style={attachment? {backgroundImage:`url(${attachment})`} : {backgroundImage:''}}></div>
          <div className="profile_cont">
          {attachment && (
              <>
                <button onClick={onDeleteClick}>프로필사진 삭제</button>
              </>
            )}
            <span className="profile_name">{newDisplayName}</span>
            <input type="text" className="state_message" placeholder="미쳐야 미친다" />
            <form onSubmit={onSubmit}>
              <input type="text" onChange={onChange} value={newDisplayName} placeholder={userObj.displayName} />
              <input type="file" accept="image/*" onChange={onFilechange} />
            </form>
            <ul className="profile_menu">
              <li>
                <Link to={"#"}>
                  <span className="icon">
                    <FaComment />
                  </span>
                  나와의 채팅
                </Link>
              </li>
              <li>
                <Link to={"#"} onClick={onSubmit}>
                  <span className="icon">
                    <FaPencilAlt />
                  </span>
                  프로필 수정
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Myprofile;
