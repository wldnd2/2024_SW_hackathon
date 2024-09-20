import React, { useEffect, useState } from 'react';
import '../styles/index.css';

export default function StorePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneN, setPhoneN] = useState('');
  const [notAllow, setNotAllow] = useState(true);
  const [nameValid, setNameValid] = useState(false);
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
    <div className="page">
      <div className="titleWrap">상점 정보 입력 페이지</div>

      <div className="contentWrap">
        <div className="inputTitle">상점 이름</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="대구 베이커리"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="errorMessageWrap">
          {!nameValid && name.length > 0 && <div>상점 이름을 입력해주세요.</div>}
        </div>

        <div className="inputTitle">카테고리</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="따뜻함과 달콤함을 나누는 생크림 단팥빵 판매 업체입니다."
          />
        </div>

        <div className="inputTitle">상점 위치</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="상점 주소를 입력하세요."
          />
        </div>

        <div className="inputTitle">전화번호</div>
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
            placeholder="daegu@gmail.com"
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
            className="bottomButton"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
