import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const CreatorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CreatorName = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const CreatorContent = styled.div`
  max-width: 1200px;
  width: 90%;
  margin-top: 30px;
  text-align: center;

  p {
    font-size: 18px;
    line-height: 1.6;
    color: #555;
  }
`;

const BottomButtonWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  position: sticky;
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
  position: sticky;
  bottom: 0;

  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;

const SelectButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: #055b07;
  border-radius: 64px;
  color: white;
  margin-bottom: 16px;
  cursor: pointer;
  position: sticky;
  bottom: 0;
`;

export default function MatchingDetail() {
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 버튼 클릭 시 Search로 이동
  const handleSearch = () => {
    navigate('/search');  // '/search' 경로로 이동
  };

  // 버튼 클릭 시 Search로 이동
  const handleSelect = () => {
    navigate('/apply', { state: { creatorId: creator.id } });  // '/search' 경로로 이동
  };

  const { id } = useParams();  // URL에서 ID 가져옴
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    // 데이터에서 해당 ID의 크리에이터를 찾아서 보여줌
    fetch('/creators.json')
      .then(response => response.json())
      .then(data => {
        const foundCreator = data.find((item) => item.id === parseInt(id));
        setCreator(foundCreator);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!creator) {
    return <div>로딩 중...</div>;
  }

  const extractedText = creator.item.match(/“([^“”]+)”/)[1];

  return (
    <Page>
      {/* 이미지 URL이 있을 경우에만 이미지를 렌더링 */}
      {creator.imageUrl && (
        <ImageContainer>
          <CreatorImage src={creator.imageUrl} alt={creator.name} />
          <CreatorName>{creator.name}</CreatorName>
        </ImageContainer>
      )}

      <CreatorContent>
        <p>7대 분야: {creator.category}</p>
        <p>아이템: {extractedText}</p>
        <p>아이템 설명: {creator.item}</p>
        <p>지역: {creator.region} {creator.subregion}</p>
        <p>홈페이지: <a href={creator.homepage} target="_blank" rel="noopener noreferrer">{creator.homepage}</a></p>
      </CreatorContent>

      <BottomButtonWrap>
        <BottomButton onClick={handleSearch}>
          목록 보기
        </BottomButton>
      </BottomButtonWrap>

      <BottomButtonWrap>
        <SelectButton onClick={handleSelect}>
          매칭 신청하기
        </SelectButton>
      </BottomButtonWrap>
    </Page>
  );
}