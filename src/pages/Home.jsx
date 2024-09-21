import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemSlider from '../components/ItemSlider';
// import MainCard from '../components/MainCard';
// import { MainCardInfo } from '../constants/MainCardInfo';
import Footer from '../components/Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth 관련 import
import app from '../firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const KeywordSection = styled.div`
  margin: 20px;
  text-align: center;
`;

const Keyword = styled.span`
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 8px 12px;
  margin: 5px;
  display: inline-block;
`;

const Home = () => {
  const [user, setUser] = useState(null);
  const [userKeywords, setUserKeywords] = useState([]);

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

  return (
    <Container>
      <ItemSlider />
      {/* <MainCardContainer>
        {MainCardInfo.map((card, index) => {
          return (
            <MainCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              link={card.link}
            />
          );
        })}
      </MainCardContainer> */}
      <Footer />
    </Container>
  );
};

export default Home;
