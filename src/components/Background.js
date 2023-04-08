import { db, storage } from 'fbase';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import backgroundImg from '../images/bg_default.png'

function Background({userObj}) {
  const [attachment, setAttachment] = useState(backgroundImg);

  useEffect(() => {
    const q = query(collection(db, `${userObj.uid}backgroundImg`),
    orderBy("createdAt", "desc")) //내림차순
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      if (newArray.length > 0) {
        setAttachment(newArray[0].attachmentUrl);
      }
    });
      },[userObj.uid]);
   
  
 const onFilechange = (e) => {
    console.log('e->', e);
    const {target: {files}} = e;

    const theFile = files[0]; //현재 이미지가 들어가 있는 주소(jpg이미지주소가 들어가 있음)

    const reader = new FileReader(); //FileReader라는 브라우제어서 제공하는 api함수 브라우저에 보일라면 사용해야한다 무조건 써야함 //미리보기기능 //브라우저에 있는 모든 이미지대상
      reader.onloadend = (finishedEvent) => { //파일을 다 읽고나서 파라미터에 데이터가 들어온다
      console.log('finishedEvent -> ', finishedEvent);
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile); //아까 불러 들었던 이미지 파일을 url로 바꿔준다 (jpg->데이터url) 이걸해줘야 FileReader가 작동한다
    e.target.value = '';
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try { //성공시
      let attachmentUrl = ""; //이미지 다운로드
      if(attachment !==""){
        const storageRef = ref(storage, `${userObj.uid}/backgroundImg`);//스토리지는 자기가 직접 id를 지정해줘야한다 그래서 uuid함수를 통해 유니크한 id를 지정해줘서 업로드
        const response = await uploadString(storageRef, attachment, 'data_url') ////attachment state에 이미지 url이 저장되어있기때문에 넣어준다
        attachmentUrl = await getDownloadURL(ref(storage, response.ref)); // response.ref안에 생성한 URL을 attachmentUrl 변수에 담겠다.
      }
      const docRef = await addDoc(collection(db, `${userObj.uid}backgroundImg`), {// `${userObj.uid}backgroundImg`}라는 이름으로 컬렉션을 정하고 거기에다가 저장하겠다
        creatorId: userObj.uid, //문서를 누가 작성했느냐를 알기위해서 Id를 지정해준다.
        createdAt: Date.now(),
        attachmentUrl
      });

    } catch (e) { //실패시
      console.error("Error adding document: ", e);
    }
    
  }
  const onDeleteClick = async () => {
    const ok = window.confirm("배경화면을 삭제하시겠습니까?");
    const querySnapshot = await getDocs(collection(db, `${userObj.uid}backgroundImg`));
    const storageRef = ref(storage, `${userObj.uid}/backgroundImg`);
    if (ok) {
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        await deleteObject(storageRef);
      });
      setAttachment(backgroundImg);
    }
  }
  

  return (
    <section className="background" style={{backgroundImage : `url(${attachment})`}}>
      <h2 className="blind">My porifile background image</h2>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" onChange={onFilechange} />
        <input type="submit" value="수정하기" />
      </form>
      <button onClick={onDeleteClick}>배경 삭제</button>
    </section>
  )
}

export default Background;