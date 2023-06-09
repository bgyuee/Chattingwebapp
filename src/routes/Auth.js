import React, { useCallback, useState } from 'react'
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import Header from 'components/Header';
import '../styles/auth.scss';

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState('true'); //true:회원가입, false:로그인
  const [error, setError] = useState('');

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setEmail(name === 'email' ? value : email);
    setPassword(name === 'password' ? value : password);
  }, [email, password]);
  
  const onSubmit = useCallback(async(e) => {
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
  }, [email, password, newAccount]);

  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSocialClick = useCallback(async (e) => {
    const {target:{name}} = e;
    
    let provider;
    if(name==='google'){
      provider = new GoogleAuthProvider();
    }else if(name==='github'){
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
  }, []);
  return (
    <div className='auth_wrap'>
      <h2>{newAccount ? "Sign up" : "Login"}</h2>
      <Header style={{backgroundColor : "transparent"}} />
      {error && <div className="error">{error}</div>}
      <div className='auth_content'>
        <form onSubmit={onSubmit}>
          <input className='auth_email' name='email' type='email' placeholder='이메일' required 
           value={email} onChange={onChange} />
          <input className='auth_passwword' name='password' type='password' placeholder='비밀번호' required 
           value={password} onChange={onChange} />  
          <input className='auth_submit' type='submit' value={newAccount ? "회원가입":"로그인"} />
        </form>
        <span className='auth_convert' onClick={toggleAccount} >
          {newAccount ? "로그인" : "회원가입"}
        </span>
        <div className='auth_another'>
          <button className='auth_google' name='google' onClick={onSocialClick}>
            {newAccount ? "구글 회원가입" : "구글 로그인"}
          </button>
          <button className='auth_github' name='github' onClick={onSocialClick}>
            {newAccount ? "깃허브 회원가입" : "깃허브 로그인"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth