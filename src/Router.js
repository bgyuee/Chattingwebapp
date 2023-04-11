import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from "routes/Main";
import Auth from 'routes/Auth';
import Chats from "routes/Chats";
import Find from "routes/Find";
import More from "routes/More";
import Profile from "routes/Profile";
import Chatting from "routes/Chatting";
import Myprofile from "routes/Myprofile";
import userList from "data/mock.json";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'fbase';

function AppRouter({isLoggedIn, userObj}) {
  const [statemessage, setStatemessage] = useState("");
  console.log('userObj->>>>>>>>', userObj);
  useEffect(() => {
    if (userObj) { // userObj가 null이 아닐 때만 실행
      const q = query(collection(db, `${userObj.uid}statemessage`), orderBy("createdAt", "desc")) //내림차순
      const unsubscribe = onSnapshot(q, (querySnapshot => {
        const newArray = [];
        querySnapshot.forEach((doc) => {
          newArray.push({ ...doc.data(), id: doc.id});
        });
        if (newArray.length > 0) {
          setStatemessage(newArray[0].statemessage);
        }
      }));
      return unsubscribe;
    }
  }, [userObj]);


  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? 
        <>
          (<Route path='/' element={<Main userList={userList} userObj={userObj} statemessage={statemessage} />} />) 
          <Route path="/chats" element={<Chats userList={userList} />} />
          <Route path="/chatting/:id" element={<Chatting userObj={userObj} />} />
          <Route path="/find" element={<Find />} />
          <Route path="/more" element={<More userObj={userObj} />} />
          <Route path="/profile" element={<Profile userList={userList} />} />
          <Route path="/myprofile" element={<Myprofile userObj={userObj} statemessage={statemessage} setStatemessage={setStatemessage} />} />
          <Route path="/profile/:id" element={<Profile />} />
        </>
        : (<Route path='/' element={<Auth />} />)}
       
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter