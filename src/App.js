import React, { useEffect, useState } from 'react';
import AppRouter from 'Router';
import { authService } from 'fbase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //현재는 null값이라 false
  console.log('authService.currentUser ->', authService.currentUser); //currentUser : 현재 로그인한 사람확인하는 함수

 const [userObj, setUserObj] = useState(null);

  useEffect(() => { //특정한 시점에 실행되는 함수(랜더링될때 한번 최초로 실행된다)
    onAuthStateChanged(authService, (user) => { //파이어 베이스가 초기화될때마다 진짜 유저정보가 들어온다// 회원가입을 하면 자동으로 로그인하는데 이시점(useState(authService.currentUser);받아오는 시점 이때 딱 useEfeect가 한번 실행된다)에서 useEffect가 실행된다 (함수가 컴포넌트 디드 마운트시점에 처음 렌더링될때 실행되는 함수)
      if(user){
        setIsLoggedIn(user); //사용자 정보고 들어와서 true가 된다
        setUserObj(user);

      } else {
        setIsLoggedIn(false);
      }
    })
  },[])


  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
    </>
  )
}

export default App