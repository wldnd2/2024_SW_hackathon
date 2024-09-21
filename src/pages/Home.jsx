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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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
      <Footer />
    </Container>
  );
};

export default Home;
