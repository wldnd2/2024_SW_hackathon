import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemSlider from '../components/ItemSlider';
import MainCard from '../components/MainCard';
import { MainCardInfo } from '../constants/MainCardInfo';
import Footer from '../components/Footer';

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
  const [userKeywords, setUserKeywords] = useState([]);

  useEffect(() => {
    // localStorage에서 회원가입 시 저장된 유저 데이터를 가져옴
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.selectedKeywords) {
      setUserKeywords(userData.selectedKeywords);
    }
  }, []);

  return (
    <Container>
      <ItemSlider />

      <MainCardContainer>
        {MainCardInfo.map((card, index) => (
          <MainCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            link={card.link}
          />
        ))}
      </MainCardContainer>
      <KeywordSection>
        <h3>회원님의 관심 키워드</h3>
        {userKeywords.map((keyword, index) => (
          <Keyword key={index}>{keyword}</Keyword>
        ))}
      </KeywordSection>

      <Footer />
    </Container>
  );
};

export default Home;
