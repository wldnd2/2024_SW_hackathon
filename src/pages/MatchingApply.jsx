import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreatorList from '../constants/CreatorList'; // CreatorList 가져오기

const Page = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  left: 50%;
  transform: translate(-49%, 0);
  background-color: #F7F7F7;
  overflow-y: auto;  /* 세로 스크롤을 가능하게 함 */
  overflow-x: hidden; /* 가로 스크롤은 숨김 */
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  margin-top: 80px;
  font-size: 26px;
  font-weight: 700;
  color: #262626;
  text-align: center;
`;

const ContentWrap = styled.div`
  margin-top: 20px;
  flex: 1;
`;

const InputTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding: 0px 5px;
  color: #262626;
`;

const InputTitle1 = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 10px;
`;

const InputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #e2e0e0;
  margin-bottom: 16px;

  &:focus-within {
    border: 1px solid #9e30f4;
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  height: 17px;
  font-size: 14px;
  font-weight: 400;
  padding: 8px;  /* 텍스트 입력 시 여백을 줘서 가독성 향상 */

  &::placeholder {
    color: #dadada;
  }
`;

const BottomButtonWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  position: sticky; /* 버튼을 하단에 고정 */
`;

const BottomButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: #9e30f4;
  border-radius: 64px;
  color: white;
  margin-bottom: 16px;
  cursor: pointer;
  position: sticky; /* 버튼을 하단에 고정 */
  bottom: 0;

  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;

const CreatorDetailsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: inset 0 0px 8px rgba(0, 0, 0, 0.2);
`;

const CreatorImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const CreatorDetails = styled.div`
  flex: 1;
`;

const CreatorTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CreatorInfo = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const CreatorLink = styled.a`
  font-size: 16px;
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

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
    <Page>
      <TitleWrap>
        매칭 신청 작성 페이지
      </TitleWrap>

      {/* 크리에이터 정보 출력 */}
      <CreatorDetailsContainer>
        <CreatorImage src={creator.imageUrl} alt={creator.name} />
        <CreatorDetails>
          <CreatorTitle>{creator.name}</CreatorTitle>
          <CreatorInfo>7대 분야: {creator.category}</CreatorInfo>
          <CreatorInfo>아이템: {extractedText}</CreatorInfo>
          <CreatorInfo>아이템 설명: {creator.item}</CreatorInfo>
          <CreatorInfo>지역: {creator.region} {creator.subregion}</CreatorInfo>
          <CreatorInfo>홈페이지: <CreatorLink href={creator.homepage} target="_blank" rel="noopener noreferrer">{creator.homepage}</CreatorLink></CreatorInfo>
        </CreatorDetails>
      </CreatorDetailsContainer>

      <ContentWrap>
        <InputTitle1>협업 제안서</InputTitle1>
        
        {/* 상점 정보 입력 */}
        <InputTitle>상점 이름</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='상점 이름을 입력하세요'
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)} />
        </InputWrap>

        <InputTitle>연락처 정보</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='연락처 정보를 입력하세요 (이메일, 전화번호 등)'
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)} />
        </InputWrap>

        {/* 협업 제안서 */}
        <InputTitle>협업 제안서</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='협업을 원하는 상품 종류, 제작 방식 등'
            value={collabProposal}
            onChange={(e) => setCollabProposal(e.target.value)} />
        </InputWrap>

        {/* 협업 방식 선택 */}
        <InputTitle style={{ marginTop: "26px" }}>희망 협업 방식 선택</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='번들 상품 제작, 한정판 상품 기획, 커스터마이징 옵션 제공 등.'
            value={collabMethod}
            onChange={(e) => setCollabMethod(e.target.value)} />
        </InputWrap>

        {/* 예산 정보 */}
        <InputTitle>예산</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='협업에 사용할 예산을 입력하세요'
            value={budget}
            onChange={(e) => setBudget(e.target.value)} />
        </InputWrap>

        {/* 일정 정보 */}
        <InputTitle>일정</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='예상 협업 기간 및 일정 (예: 3개월, 출시일 등)'
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)} />
        </InputWrap>

        {/* 파일 업로드 */}
        {/* <InputTitle>디자인 참고 자료 업로드</InputTitle>
        <FileWrap>
          <Input
            type='file'
            multiple
            onChange={(e) => setFiles(e.target.files)} />
        </FileWrap> */}

        <BottomButtonWrap>
          <BottomButton 
            onClick={handleSubmit}>
            신청
          </BottomButton>
        </BottomButtonWrap>
      </ContentWrap>
    </Page>
  );
}