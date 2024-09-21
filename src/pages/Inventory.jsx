import PropTypes from 'prop-types';
import ProfileCard from '../components/ProfileCard.jsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Inventory = ({ infomations }) => {
  if (!Array.isArray(infomations)) {
    return <div>Invalid data</div>;
  }

  return (
    <Container>
      {infomations.map((info, index) => (
        <ProfileCard key={index} person={info} />
      ))}
    </Container>
  );
}

Inventory.propTypes = {
  infomations: PropTypes.array.isRequired,
};

export default Inventory;