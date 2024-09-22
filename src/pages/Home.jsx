import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemSlider from '../components/ItemSlider';
// import MainCard from '../components/MainCard';
// import { MainCardInfo } from '../constants/MainCardInfo';
import Footer from '../components/Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth 관련 import
import app from '../firebase';
import KeywordListComponent from '../components/KeywordListComponent';
import CreatorListComponent from '../components/CreatorListComponent';
import CreatorList from '../constants/CreatorList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreatorListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 10px;
`;

const CreatorCard = styled.div`
  width: calc(33% - 16px);
  cursor: pointer;
  transition: transform 0.2s;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const CardMedia = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 10px;
`;

const Typography = styled.div`
  margin-bottom: 5px;
`;

const LargeTypography = styled(Typography)`
  font-size: 1.1em; /* 텍스트를 크게 만듦 */
  font-weight: bold; /* 텍스트를 굵게 만듦 */
`;

const NoResult = styled.div`
  text-align: center;
  color: #999;
  font-size: 18px;
  margin-top: 20px;
`;

const Home = () => {
  const [user, setUser] = useState(null);
  const [userKeywords] = useState([]);
  const [filteredCreators] = useState(CreatorList);

  // Firebase 인증 인스턴스 가져오기
  const auth = getAuth(app);

  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    // Firebase Authentication에서 현재 로그인한 유저를 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 현재 로그인한 유저 정보 설정
      } else {
        setUser(null); // 로그아웃 시 null
      }
    });

    return () => unsubscribe(); // 컴포넌트가 언마운트되면 리스너 정리
  }, [auth]);

  const handleCardClick = (creator) => {
    // 카드 클릭 시 동작 정의
    console.log('Card clicked:', creator);
  };

  return (
    <Container>
      <ItemSlider />

      {/* 유저가 로그인한 상태일 때 사용자 정보 표시 */}
      {user ? (
        <>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>Welcome, {user.displayName || 'User'}!</h2> {/* 유저 이름 출력 */}
            <p>Email: {user.email}</p> {/* 유저 이메일 출력 */}
          </div>

          {userKeywords.length > 0 && (
            <div>
              <h3>Your Keywords:</h3>
              {userKeywords.map((keyword, index) => (
                <span key={index}>{keyword}</span>
              ))}
            </div>
          )}

          <KeywordListComponent />
          <CreatorListComponent />
        </>
      ) : (
        <CreatorListContainer>
          {filteredCreators.length > 0 ? (
            filteredCreators.map((creator, index) => (
              <CreatorCard 
                key={index}
                onClick={() => handleCardClick(creator)} // 카드 클릭 시 handleCardClick 호출
              >
                {/* 이미지 */}
                <CardImageContainer>
                  <CardMedia
                    src={creator.imageUrl}
                    alt={creator.name}
                  />
                </CardImageContainer>
                
                {/* 내용 */}
                <CardContent>
                  <LargeTypography>
                    {creator.name}
                  </LargeTypography>
                  <Typography>
                    분야: {creator.category}
                  </Typography>
                  <Typography>
                    지역: {creator.region} {creator.subregion}
                  </Typography>
                </CardContent>
              </CreatorCard>
            ))
          ) : (
            <NoResult>검색 결과가 없습니다.</NoResult>
          )}
        </CreatorListContainer>
      )}
      <Footer />
    </Container>
  );
};

export default Home;