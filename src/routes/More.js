import React from 'react'
import Header from "components/Header";
import Tab from "components/Tab";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSmile, FaPaintBrush, FaHandPeace, FaUserCircle, FaUtensils, FaStore,
  FaTv, FaPencilAlt, FaGraduationCap, FaWonSign, FaVideo, FaInfoCircle
} from "react-icons/fa";
import { MdSettingsSuggest,} from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";
import 'styles/more.scss';
import { authService } from 'fbase';

function More(props) {
  console.log('props ===>', props);
  const {displayName, photoURL} = props.userObj;
  
  

  const a = <>More</>
  const c = <Link to={"#"}><MdSettingsSuggest /></Link>;

  const navigate = useNavigate();
  
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/')
  }


  return (
    <>
    <Header a={a} c={c} />
    <main className='more_main'>
      <section className='user_info'>
        <h2 className='blind'>사용자 정보</h2>
        <span className='profile_img empty' style={photoURL? {backgroundImage:`url(${photoURL})`} : {backgroundImage:''}}></span>
        <span className='profile_info'>
          <span className='profile_name'>{displayName}</span>
          <span className='profile_email'>pky5396@gmail.com</span>
        </span>
        <span className='logout'><button onClick={onLogOutClick}><FiLogOut /></button></span>
      </section>
      <section className='user_menu'>
        <h2 className='blind'>사용자 메뉴</h2>
        <ul>
          <li><Link to={"#"}><FaSmile />Emoticons</Link></li>
          <li><Link to={"#"}><FaPaintBrush />Themes</Link></li>
          <li><Link to={"#"}><FaHandPeace />Plus Friends</Link></li>
          <li><Link to={"#"}><FaUserCircle />Account</Link></li>
        </ul>
      </section>
      <section className='plus_friends'>
        <header>
        <h2>Plus Friends</h2>
        <span><FaInfoCircle /> Learn More</span>
        </header>
        <ul className='plus_list'>
          <li><Link><FaUtensils />Order</Link></li>
          <li><Link><FaStore />Store</Link></li>
          <li><Link><FaTv />TV Channel/Raio</Link></li>
          <li><Link><FaPencilAlt />Creation</Link></li>
          <li><Link><FaGraduationCap />Education</Link></li>
          <li><Link><HiAcademicCap />Politics/Society</Link></li>
          <li><Link><FaWonSign />Finance</Link></li>
          <li><Link><FaVideo />Movies/Music</Link></li>
        </ul>
        
      </section>
      <section className='more_app'>
        <h2 className='blind'>앱 더보기</h2>
        <ul>
          <li><Link><span className='app_icon'></span>Kakao Story</Link></li>
          <li><Link><span className='app_icon'></span>Path</Link></li>
          <li><Link><span className='app_icon'></span>Kakao friends</Link></li>
        </ul>
      </section>
    </main>
    <Tab />
    </>
  )
}

export default More;