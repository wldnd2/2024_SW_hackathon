import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ItemInfo } from '../constants/ItemInfo'; // named import 사용

const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 80vh;
  background-color: #F7F7F7;
  border: 2px solid #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 16px;
  border-radius: 10px;
`;

const StyledTitle = styled(Typography)`
  font-size: 26px;
  font-weight: 700;
  color: #262626;
  margin-bottom: 16px;
`;

const StyledDescription = styled(Typography)`
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 16px;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
  text-align: center;
  transition: box-shadow 0.2s;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  max-height: 300px; /* 최대 높이 설정 */
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const ProfileModal = ({ open, handleClose, person }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <StyledBox>
        <StyledImage src={person.imgPath} alt={person.name} />
        <StyledTitle id="profile-modal-title" variant="h6" component="h2">
          {person.name}
        </StyledTitle>
        <StyledDescription id="profile-modal-description">
          {person.description}
        </StyledDescription>
        <ItemContainer>
          {ItemInfo.map((item) => (
            <ItemCard key={item.title}>
              <ItemImage src={item.imgPath} alt={item.title} />
              <Typography variant="body2" fontWeight="bold">{item.title}</Typography>
              <Typography variant="body2" color="textSecondary">{item.maker}</Typography>
              <Typography variant="body2" color="primary">{item.price}원</Typography>
              <Typography variant="body2">{item.description}</Typography>
            </ItemCard>
          ))}
        </ItemContainer>
      </StyledBox>
    </Modal>
  );
}

ProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgPath: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ProfileModal;