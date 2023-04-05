import React, { useState } from 'react'
import { authService } from 'fbase';
import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from 'styles/auth.scss'
import Header from 'components/Header';


function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState('true'); //true:회원가입, false:로그인
  const [error, setError] = useState('');

  const onChange = (e) => {
    console.log('e.target.name ->', e.target.name);
    console.log(e);
    const {target:{name, value}} = e; //구조분해 할당으로 데이터를 가져온다
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      let data; //회원가입, 로그인 응답결과를 data변수에 저장
      if(newAccount){ //회원가입
        data = await createUserWithEmailAndPassword(authService, email, password);
      }else{//로그인
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log('data->', data);
    } catch (error) {
      console.log('error->', error);
      setError(error.message); //에러메세지부분만 화면으로 내보내 주겠다.
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSocialClick = async (e) => {
    const {target:{name}} = e;
    let provider;
    if(name==='google'){
      provider = new GoogleAuthProvider();
    }else if(name==='github'){
      provider = new GithubAuthProvider();
    }
    console.log(provider);
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  }
  return (
    <div className='auth_wrap'>
      <Header />
      <div className='ayth_content'>
        <form onSubmit={onSubmit}>
          <input name='email' type='email' placeholder='Email' required 
           value={email} onChange={onChange} />
          <input name='password' type='password' placeholder='Password' required 
           value={password} onChange={onChange} />
          <input type='submit' value={newAccount ? "계정만들기":"로그인"} />
        </form>
        <span onClick={toggleAccount} style={{cursor:"pointer"}}>
          {newAccount ? "로그인" : "계정만들기"}
        </span>
        <div>
          <button name='google' onClick={onSocialClick}>Continue with Google</button>
          <button name='github' onClick={onSocialClick}>Continue with Github</button>
      </div>
      </div>
    </div>
  )
}

export default Auth