import styled from 'styled-components';
import ItemSlider from '../components/ItemSlider';
import MainCard from '../components/MainCard';
import { MainCardInfo } from '../constants/MainCardInfo';

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

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  width: 100%; /* Makes footer full width */
  position: relative;
  bottom: 0;
`;

const Home = () => {
  return (
    <Container>
      <ItemSlider />
      <MainCardContainer>
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
      </MainCardContainer>
      <Footer>
        &copy; 2024 Your Company Name. All rights reserved.
      </Footer>
    </Container>
  );
};

export default Home;