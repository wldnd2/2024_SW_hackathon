import { useState, useEffect } from 'react';
import '../styles/MyPage.css'; // Include your CSS file for layout and styles
import StorePage from './StorePage'; // Import the store page component
import CreatorPage from './CreatorPage';
import MatchingPage from './MatchingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth 관련 import
import app from '../firebase';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export default function MyPage() {
  // State to track which page content to show
  const [activePage, setActivePage] = useState('account');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneN, setPhoneN] = useState('');
  const [notAllow, setNotAllow] = useState(true);

  const [nameValid, setNameValid] = useState(true); // Assume name is valid initially
  const [emailValid, setEmailValid] = useState(false);
  const [phoneNValid, setPhoneNValid] = useState(false);

  const auth = getAuth(app);
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });


  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    if (user) {
      // Firebase Realtime Database에서 해당 유저의 정보를 가져옴
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserInfo({
            name: data.name || '',
            email: user.email, // email은 auth에서 가져옴
            phone: data.phone || '', // phone 번호도 가져옴
          });
        }
      });
    }
  }, [user]);

  const handleName = (e) => {
    setName(e.target.value);
    const regex = /^[A-Za-z0-9가-힣\s]+$/;
    const trimmedValue = e.target.value.trim();
    setNameValid(regex.test(trimmedValue));
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(email));
  };

  const handlePhoneN = (e) => {
    const cleanedValue = e.target.value.replace(/\s+/g, '');
    setPhoneN(cleanedValue);
    const regex = /^(010|053)-\d{4}-\d{4}$/;
    setPhoneNValid(regex.test(cleanedValue));
  };

  useEffect(() => {
    setNotAllow(!(nameValid && emailValid && phoneNValid));
  }, [nameValid, emailValid, phoneNValid]);

  const renderContent = () => {
    if (!user) {
      return <div>Loading...</div>; // user가 null일 때 로딩 메시지 표시
    }

    if (activePage === 'account') {
      return (
        <div className="profile-form">
          <h1>회원 정보</h1>
          <div className="inputTitle">이름</div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder={userInfo.name}
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="errorMessageWrap">
            {!nameValid && name.length > 0 && (
              <div>이름을 정확히 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: '26px' }} className="inputTitle">이메일</div>
          <div className="inputWrap">
            <input
              type="email"
              className="input"
              placeholder={userInfo.email}
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: '26px' }} className="inputTitle">휴대폰 번호</div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder={userInfo.phone}
              value={phoneN}
              onChange={handlePhoneN}
            />
          </div>
          <div className="errorMessageWrap">
            {!phoneNValid && phoneN.length > 0 && (
              <div>올바른 전화번호를 입력해주세요.</div>
            )}
          </div>

          <div>
            <button
              disabled={notAllow}
              className="bottomButton">
              변경사항 저장
            </button>
          </div>
        </div>
      );
    } else if (activePage === 'store') {
      // Render the store page component
      return <StorePage />;
    } else if (activePage === 'creator') {
      return <CreatorPage />;
    } else if (activePage === 'matching') {
      return <MatchingPage />;
    }
  };

  return (
    <div className="mypage-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-name">{name}</div> {/* 자동으로 이름 표시 */}
          <div className="profile-status"></div>
        </div>
        <ul className="menu-list">
          <li onClick={() => setActivePage('account')}>회원 정보</li>
          <li onClick={() => setActivePage('store')}>내 상점 정보</li>
          <li onClick={() => setActivePage('creator')}>내 크리에이터 정보</li>
          <li onClick={() => setActivePage('matching')}>매칭 기록</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()} {/* Dynamically render content based on the active page */}
      </div>
    </div>
  );
}