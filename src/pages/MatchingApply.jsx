import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreatorList from '../constants/CreatorList'; // CreatorList 가져오기

import '../styles/index.css';

export default function MatchingApply() {
  const navigate = useNavigate();  // useNavigate 훅 사용
  const location = useLocation();
  const { creatorId } = location.state || {};  // 전달된 creatorId 받기
  const [creator, setCreator] = useState(null);

  const [storeName, setStoreName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [collabProposal, setCollabProposal] = useState('');
  const [collabMethod, setCollabMethod] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  // const [files, setFiles] = useState(null);

  // creatorId가 있을 경우 해당 데이터를 CreatorList에서 가져오기
  useEffect(() => {
    if (creatorId) {
      const foundCreator = CreatorList.find((item) => item.id === creatorId);
      setCreator(foundCreator);
    }
  }, [creatorId]);

  if (!creator) {
    return <div>로딩 중...</div>;
  }

  const extractedText = creator.item.match(/“([^“”]+)”/)[1];

  // 버튼 클릭 시 home 이동
  const handleSubmit = () => {
    if (creator && creator.name) {
      // 기존 로컬 스토리지에서 "매칭 신청한 로컬 크리에이터" 데이터를 가져옴
      const storedCreators = JSON.parse(localStorage.getItem('매칭 신청한 로컬 크리에이터')) || [];

      // 새로운 크리에이터 이름을 배열에 추가
      const updatedCreators = [...storedCreators, creator.name];

      // 배열을 로컬 스토리지에 저장
      localStorage.setItem('매칭 신청한 로컬 크리에이터', JSON.stringify(updatedCreators));
      console.log('Updated creator list saved to localStorage:', updatedCreators);
    }
    navigate('/');  // '/' 경로로 이동
  };

  return (
    <div className="page">
      <div className="titleWrap">
        매칭 신청 작성 페이지
      </div>

      {/* 크리에이터 정보 출력 */}
      <div className="creatorDetails">
        <h2>{creator.name}</h2>
        <p>7대 분야: {creator.category}</p>
        <p>아이템: {extractedText}</p>
        <p>아이템 설명: {creator.item}</p>
        <p>지역: {creator.region} {creator.subregion}</p>
        <p>홈페이지: <a href={creator.homepage} target="_blank" rel="noopener noreferrer">{creator.homepage}</a></p>
      </div>

      <div className='contentWrap'>
        <div className='inputTitle'>협업 제안서</div>
        {/* 상점 정보 입력 */}
        <div className='inputTitle'>상점 이름</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='상점 이름을 입력하세요'
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)} />
        </div>

        <div className='inputTitle'>연락처 정보</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='연락처 정보를 입력하세요 (이메일, 전화번호 등)'
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)} />
        </div>

        {/* 협업 제안서 */}
        <div className='inputTitle'>협업 제안서</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='협업을 원하는 상품 종류, 제작 방식 등'
            value={collabProposal}
            onChange={(e) => setCollabProposal(e.target.value)} />
        </div>

        {/* 협업 방식 선택 */}
        <div style={{ marginTop: "26px" }} className='inputTitle'>희망 협업 방식 선택</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='번들 상품 제작, 한정판 상품 기획, 커스터마이징 옵션 제공 등.'
            value={collabMethod}
            onChange={(e) => setCollabMethod(e.target.value)} />
        </div>

        {/* 예산 정보 */}
        <div className='inputTitle'>예산</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='협업에 사용할 예산을 입력하세요'
            value={budget}
            onChange={(e) => setBudget(e.target.value)} />
        </div>

        {/* 일정 정보 */}
        <div className='inputTitle'>일정</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='예상 협업 기간 및 일정 (예: 3개월, 출시일 등)'
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)} />
        </div>

        {/* 파일 업로드 */}
        {/* <div className='inputTitle'>디자인 참고 자료 업로드</div>
        <div className='fileWrap'>
          <input
            type='file'
            className='file'
            multiple
            onChange={(e) => setFiles(e.target.files)} />
        </div> */}

        <div className="bottomButtonWrap">
          <button 
            className='bottomButton'
            onClick={handleSubmit}>
            신청
          </button>
        </div>
      </div>
    </div>
  );
}