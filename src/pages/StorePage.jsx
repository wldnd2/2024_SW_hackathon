import React, { useState, useEffect } from 'react';
import '../styles/MyPage.css'; // 동일한 CSS 사용

export default function StorePage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [phoneN, setPhoneN] = useState('');
  const [email, setEmail] = useState('');
  const [notAllow, setNotAllow] = useState(true);

  const [nameValid, setNameValid] = useState(false);
  const [categoryValid, setCategoryValid] = useState(true); // Assuming category is valid
  const [phoneNValid, setPhoneNValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    const regex = /^[A-Za-z0-9가-힣\s]+$/;
    const trimmedValue = e.target.value.trim();
    setNameValid(regex.test(trimmedValue));
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
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

  return (
    <div className="profile-form">
      <div className="profile-form">
        <h1>상점 정보</h1>
        <div className="inputTitle">상점 이름</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="상점 이름을 입력하세요"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="errorMessageWrap">
          {!nameValid && name.length > 0 && (
            <div>상점 이름을 입력해주세요.</div>
          )}
        </div>
        <div className="inputTitle">카테고리</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="카테고리를 입력하세요"
            value={category}
            readOnly
          />
        </div>
        <div className="inputTitle">상점 위치</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="상점 주소를 입력하세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="inputTitle">상점 전화번호</div>
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
        <div className="inputTitle">이메일</div>
        <div className="inputWrap">
          <input
            type="text"
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
        <div>
          <button
            disabled={notAllow}
            className="bottomButton">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
