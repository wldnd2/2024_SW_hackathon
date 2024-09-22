import PropTypes from 'prop-types';
import { Modal, Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ItemContainer from './ItemContainer'; // ItemContainer 컴포넌트 가져오기

const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #F7F7F7;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 16px;
  border-radius: 10px;
`;

const StyledDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 0 30px;
`;

const StyledTitle = styled(Typography)`
  font-size: 26px;
  font-weight: 700;
  color: #262626;
  margin-bottom: 10px;
`;

const StyledDescription = styled(Typography)`
  font-size: 14px;
  color: #555;
  padding: 3px 0;
`;

const ApplyButton = styled.button`
  width: 300px;
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreatorModal = ({ open, handleClose, creator }) => {
  const navigate = useNavigate();
  if (!creator) return null; // creator가 존재하지 않을 경우 null 반환

  const handleApplyClick = () => {
    navigate('/apply', { state: { creatorId: creator.id } });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <StyledImage src={creator.imageUrl} alt={creator.name} />
        <StyledDescriptionContainer>
          <StyledTitle id="modal-modal-title" variant="h6" component="h2">
            {creator.name}
          </StyledTitle>
          <StyledDescription id="modal-modal-description">
            {creator.item}
          </StyledDescription>
          <StyledDescription>
            <strong>홈페이지:</strong> <a href={creator.homepage} target="_blank" rel="noopener noreferrer">{creator.homepage}</a>
          </StyledDescription>
          <StyledDescription>
            <strong>지역:</strong> {creator.region} {creator.subregion}
          </StyledDescription>
          <StyledDescription>
            <strong>카테고리:</strong> {creator.category}
          </StyledDescription>
          <StyledDescription>
            <strong>설립 연도:</strong> {creator.year}
          </StyledDescription>
        </StyledDescriptionContainer>
        <Typography variant="h6" component="h2">추천 상품</Typography>
        <ItemContainer />
        <ApplyButton onClick={handleApplyClick}>협업 신청</ApplyButton>
      </StyledBox>
    </Modal>
  );
};

CreatorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  creator: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
    item: PropTypes.string,
    region: PropTypes.string,
    subregion: PropTypes.string,
    homepage: PropTypes.string,
    year: PropTypes.number,
  }),
};

export default CreatorModal;