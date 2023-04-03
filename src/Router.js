import React from 'react'
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

function AppRouter({isLoggedIn, userObj}) {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (<Route path='/' element={<Main userList={userList} />} />) : (<Route path='/' element={<Auth />} />)}
        <Route path="/chats" element={<Chats userList={userList} />} />
        <Route path="/chatting" element={<Chatting userObj={userObj} />} />
        <Route path="/chatting/:id" element={<Chatting />} />
        <Route path="/find" element={<Find />} />
        <Route path="/more" element={<More />} />
        <Route path="/profile" element={<Profile userList={userList} />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter