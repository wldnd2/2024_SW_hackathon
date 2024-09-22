import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CardContainer = styled(Link)`
  width: 180px;
  height: 180px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
`;

const BackgroundImage = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  filter: blur(0.5px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 0.5em 0;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
`;

const MainCard = ({ title, description, image, link }) => {
  return (
    <CardContainer to={link} className="main-card">
      <BackgroundImage src={image} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </CardContainer>
  );
}

MainCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default MainCard;