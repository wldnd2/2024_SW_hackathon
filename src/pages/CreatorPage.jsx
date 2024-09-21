import { useState, useEffect } from 'react';
import '../styles/MyPage.css'; // 동일한 CSS 사용

export default function CreatorPage() {
  const [name, setName] = useState('');
  const [category] = useState('');
  const [location, setLocation] = useState('');
  const [phoneN, setPhoneN] = useState('');
  const [bio, setBio] = useState(''); // 자기소개란 추가
  const [notAllow, setNotAllow] = useState(true);

  const [nameValid, setNameValid] = useState(false);
  // const [categoryValid, setCategoryValid] = useState(true); // Assuming category is valid
  const [phoneNValid, setPhoneNValid] = useState(false);
  const [bioValid, setBioValid] = useState(true); // 자기소개 유효성 초기값 설정

  const handleName = (e) => {
    setName(e.target.value);
    const regex = /^[A-Za-z0-9가-힣\s]+$/;
    const trimmedValue = e.target.value.trim();
    setNameValid(regex.test(trimmedValue));
  };

  const handlePhoneN = (e) => {
    const cleanedValue = e.target.value.replace(/\s+/g, '');
    setPhoneN(cleanedValue);
    const regex = /^(010|053)-\d{4}-\d{4}$/;
    setPhoneNValid(regex.test(cleanedValue));
  };

  const handleBio = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setBio(value);
      setBioValid(true); // 500자 이하일 경우 유효함
    } else {
      setBioValid(false); // 500자를 넘을 경우 유효하지 않음
    }
  };

  useEffect(() => {
    setNotAllow(!(nameValid && phoneNValid && bioValid));
  }, [nameValid, phoneNValid, bioValid]);

  return (
    <div className="profile-form">
      <div className="profile-form">
        <h1>크리에이터 정보</h1>
        <div className="inputTitle">닉네임</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="닉네임을 입력하세요"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="errorMessageWrap">
          {!nameValid && name.length > 0 && (
            <div>닉네임을 입력해주세요.</div>
          )}
        </div>
        <div className="inputTitle">주요 작업 분야</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="작업 분야를 입력하세요"
            value={category}
            readOnly
          />
        </div>
        <div className="inputTitle">경험 및 이력</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="이전 협업 사례, 자격증/수상경력을 입력하세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="inputTitle">프로필 링크</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="Instagram, Youtube 등 외부 링크를 입력하세요."
            value={phoneN}
            onChange={handlePhoneN}
          />
        </div>
        <div className="errorMessageWrap">
          {!phoneNValid && phoneN.length > 0 && (
            <div>올바른 전화번호를 입력해주세요.</div>
          )}
        </div>
        <div className="inputTitle">크리에이터 소개</div>
        <div className="inputWrap">
          <textarea
            className="input bio-textarea" // bio-textarea 클래스 추가
            placeholder="500자 이내로 입력하세요."
            value={bio}
            onChange={handleBio}
          />
        </div>
        <div className="errorMessageWrap">
          {!bioValid && (
            <div>500자를 초과하였습니다.</div>
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
