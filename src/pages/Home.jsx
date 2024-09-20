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
    </Container>
  );
};

export default Home;