import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  width: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.01);
  }
`;

const Image = styled.img`
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin-right: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin: 0.5em 0;
`;

const Maker = styled.h3`
  font-size: 1.2em;
  color: #555;
`;

const Price = styled.h4`
  font-size: 1em;
  color: #888;
`;

const Description = styled.p`
  font-size: 0.9em;
  color: #666;
`;

const ItemCarousel = ({ item }) => {
  return (
    <CardContainer>
      <Card>
        <Image src={item.imgPath} alt="item" />
        <InfoContainer>
          <Title>{item.title}</Title>
          <Maker>{item.maker}</Maker>
          <Price>{item.price}</Price>
          <Description>{item.description}</Description>
        </InfoContainer>
      </Card>
    </CardContainer>
  );
}

ItemCarousel.propTypes = {
  item: PropTypes.shape({
    imgPath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCarousel;
