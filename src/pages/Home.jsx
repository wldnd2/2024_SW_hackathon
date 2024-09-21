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
  padding: 40px 0;
  width: 100%; /* Makes footer full width */
  position: absolute;
  bottom: 0;

  span {
    display: block;
    margin-top: 5px; /* Adjust this for more/less spacing */
  }
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
        <span>&copy; 2024 SW Hackathon Millenium Babies.</span>
        <span>All rights reserved.</span>
      </Footer>
    </Container>
  );
};

export default Home;