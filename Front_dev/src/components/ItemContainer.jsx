import styled from 'styled-components';
import { Typography } from '@mui/material';
import { ItemInfo } from '../constants/ItemInfo'; // named import 사용

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 130px;
  text-align: left;
  transition: box-shadow 0.2s;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  max-height: 300px; /* 최대 높이 설정 */
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const ItemContainer = () => {
  return (
    <Container>
      {ItemInfo.map((item, index) => (
        <Card key={index}>
          <Image src={item.imgPath} alt={item.title} />
          <Typography variant="body2" fontWeight="bold">{item.title}</Typography>
          <Typography variant="body2" color="textSecondary">{item.maker}</Typography>
          <Typography variant="body2" color="primary">{item.price}원</Typography>
          <Typography variant="body2" fontSize={'12px'} marginTop={'5px'}>{item.description}</Typography>
        </Card>
      ))}
    </Container>
  );
};

export default ItemContainer;