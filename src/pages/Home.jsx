import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemSlider from '../components/ItemSlider';
// import MainCard from '../components/MainCard';
// import { MainCardInfo } from '../constants/MainCardInfo';
import Footer from '../components/Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth 관련 import
import app from '../firebase';
import KeywordListComponent from '../components/KeywordListComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// const MainCardContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
// `;

// const KeywordSection = styled.div`
//   margin: 20px;
//   text-align: center;
// `;

// const Keyword = styled.span`
//   background-color: #f0f0f0;
//   border-radius: 12px;
//   padding: 8px 12px;
//   margin: 5px;
//   display: inline-block;
// `;

const Home = () => {
  const [user, setUser] = useState(null);
  const [userKeywords] = useState([]);

  // Firebase 인증 인스턴스 가져오기
  const auth = getAuth(app);

  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    // Firebase Authentication에서 현재 로그인한 유저를 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 현재 로그인한 유저 정보 설정
        // Firestore나 Realtime Database에서 사용자 추가 정보(키워드)를 가져오려면 이곳에서 추가 가능
        // 예시로, 이메일을 기반으로 Firestore에서 추가 정보를 가져오는 로직을 작성할 수 있습니다.
      } else {
        setUser(null); // 로그아웃 시 null
      }
    });

    return () => unsubscribe(); // 컴포넌트가 언마운트되면 리스너 정리
  }, [auth]);

  return (
    <Container>
      <ItemSlider />
       {/* 유저가 로그인한 상태일 때 사용자 정보 표시 */}
        {user && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Welcome, {user.displayName || 'User'}!</h2> {/* 유저 이름 출력 */}
          <p>Email: {user.email}</p> {/* 유저 이메일 출력 */}
        </div>
      )}
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
      {userKeywords.length > 0 && (
        <div>
          <h3>Your Keywords:</h3>
          {userKeywords.map((keyword, index) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>
      )}
      <KeywordListComponent />
      <Footer />
    </Container>
  );
};

export default Home;
