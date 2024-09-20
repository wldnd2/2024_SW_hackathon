import React, { useState } from 'react';
import '../styles/MyPage.css'; // Include your CSS file for layout and styles
import StorePage from './StorePage'; // Import the store page component

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

  React.useEffect(() => {
    setNotAllow(!(nameValid && emailValid && phoneNValid));
  }, [nameValid, emailValid, phoneNValid]);

  const renderContent = () => {
    if (activePage === 'account') {
      return (
        <div className="profile-form">
          <h1>회원 정보</h1>
          <div className="inputTitle">이름</div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="이름을 입력하세요"
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
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: '26px' }} className="inputTitle">전화번호</div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="010-XXXX-XXXX 또는 053-XXXX-XXXX"
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
    }
  };

  return (
    <div className="mypage-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-name">김동주</div>
          <div className="profile-status"></div>
        </div>
        <ul className="menu-list">
          <li onClick={() => setActivePage('account')}>회원 정보</li>
          <li onClick={() => setActivePage('store')}>나의 상점 정보</li>
          <li onClick={() => setActivePage('matching')}>매칭 현황</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()} {/* Dynamically render content based on the active page */}
      </div>
    </div>
  );
}
