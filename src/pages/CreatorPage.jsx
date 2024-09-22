import { useState, useEffect } from 'react';
import '../styles/MyPage.css'; // 동일한 CSS 사용

export default function CreatorPage() {
  const [name, setName] = useState('');  // 로컬 크리에이터 이름
  const [category, setCategory] = useState(''); // 상태로 변경
  const [location, setLocation] = useState('');
  const [phoneN, setPhoneN] = useState('');
  const [bio, setBio] = useState(''); // 자기소개란 추가
  const [notAllow, setNotAllow] = useState(true);

  const [nameValid, setNameValid] = useState(false);
  const [phoneNValid, setPhoneNValid] = useState(false);
  const [bioValid, setBioValid] = useState(true); // 자기소개 유효성 초기값 설정

  // 로컬 스토리지에서 크리에이터 정보를 불러오는 useEffect
  useEffect(() => {
    const storedCreatorInfo = localStorage.getItem('creatorInfo');
    if (storedCreatorInfo) {
      const parsedInfo = JSON.parse(storedCreatorInfo);
      setName(parsedInfo.creatorName || '');  // creator.name 자동 입력 추가
      setCategory(parsedInfo.category || '');
      setLocation(parsedInfo.item || ''); // 'location' 대신 'item'이 저장된 값
      setBio(parsedInfo.itemDescription || ''); // 'bio'에 item 설명을 넣음
      setPhoneN(parsedInfo.homepage || ''); // 'phoneN' 대신 homepage를 사용
    }
  }, []);

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
        <h1>최근 신청한 크리에이터</h1>
        <div className="inputTitle">로컬 크리에이터</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            value={name}  // 로컬 크리에이터 이름이 자동 입력
            readOnly
          />
        </div>
        <div className="inputTitle">7대 분야</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            value={category}
            readOnly
          />
        </div>
        <div className="inputTitle">아이템</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            value={location}
            readOnly // 수정할 수 없도록 readOnly 추가
          />
        </div>
        <div className="inputTitle">홈페이지</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            value={phoneN}
            readOnly // 수정할 수 없도록 readOnly 추가
          />
        </div>
        <div className="inputTitle">아이템 설명</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            value={bio}
            readOnly // 수정할 수 없도록 readOnly 추가
          />
        </div>
      </div>
    </div>
  );
}
