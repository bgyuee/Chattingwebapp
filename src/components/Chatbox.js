import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from 'fbase';
import { ref, deleteObject } from "firebase/storage";

function Chatbox(props) {
  console.log('props ==asdsad', props);
  const {talkObj:{id, text, createdAt, attachmentUrl}, isOwner, userListId, userObj} = props; //구조분해 할당
  const [editing, setEditing] = useState(false);
  const [newtalk, setNewtalk] = useState(text);
  console.log('userListId sadsadsad', userListId);

  // 시간변환
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const padNumber = (number) => {
    if(number<10) number = '0' + number;
    return number;
  };

  // 삭제, 수정버튼
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok) {
      const data = await deleteDoc(doc(db, `talk${userListId}${userObj.uid}`, `/${id}`)); //talks컬렉션 안에 있는 talkObj에 해당되는 놈을 삭제
      if(attachmentUrl !=="") { //공백이 아닐경우
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef);
      }
    }
  }

  const toggleEditing = () => { setEditing((prev) => !prev) }; //토글기능 // editing기존의 true 값을 false로 바꾼다
  
  const onChange = (e) => {
    const {target:{value}} = e;
    setNewtalk(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const newTalkRef = doc(db, `talk${userListId}${userObj.uid}`, `/${id}`);
    await updateDoc(newTalkRef, {
      text: newtalk
    });
    setEditing(false); //수정 후 다시 돌아가야하니까 editing을 false로 바꿔준다.
  }

  return (
    <div className="chat_box my" key={id}> 
    {editing ? (//true면
    <>
      <form onSubmit={onSubmit}>
        <input type='text' onChange={onChange} value={newtalk} />
        <input type='submit' value='수정완료'/>
      </form>
      <button onClick={toggleEditing}>취소</button>
    </>) : (<></>)}
      {text && <span className='chat'>{text}</span>}
      {attachmentUrl !== "" && (
          <img src={attachmentUrl} width='100' height='100' alt=''/>
      )}
      <span className="chat_time">
        <span>{padNumber(hours)}</span>:<span>{padNumber(minutes)}</span>
      </span>
      {isOwner && (
        <div className='chatbox_btn'>
          <button onClick={onDeleteClick}>삭제</button>
          <button onClick={toggleEditing}>수정</button>
        </div>
      )}
    </div>
  )
}

export default Chatbox;