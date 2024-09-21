import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDatabase, ref, get } from 'firebase/database';
import app from '../firebase';
import CreatorList from '../constants/CreatorList';
import CreatorModal from '../components/CreatorModal'; // CreatorModal 컴포넌트 가져오기
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 30px;
  justify-content: center;
`;

const CreatorCard = styled(Card)`
  width: calc(33.333% - 16px);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const NoResult = styled(Typography)`
  text-align: center;
  color: #999;
  font-size: 18px;
  margin-top: 20px;
`; 

const CreatorListComponent = () => {
  const [loading, setLoading] = useState(true);
  const [similarityCreator, setSimilarityCreator] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const db = getDatabase(app);
    const rootRef = ref(db, '/top_creators'); // 루트 경로를 참조하여 전체 데이터를 가져옴

    get(rootRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("전체 데이터:", snapshot.val()); // 전체 데이터를 콘솔에 출력
          const top_creators = Object.values(snapshot.val()); // 객체를 배열로 변환하여 상태에 저장

          // similarityCreator 배열에 크리에이터 정보를 담음
          const matchedCreators = top_creators.reduce((acc, keyword) => {
            const creator = CreatorList.find(creator => creator.name === keyword.크리에이터명);
            
            if (creator) {
              acc.push(creator);
            } else {
              console.log(`Creator not found for: ${keyword.크리에이터명}`);
            }
          
            return acc;
          }, []); // No dependencies needed
          setSimilarityCreator(matchedCreators);
          console.log("유사도 크리에이터:", matchedCreators);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 각 크리에이터 카드 클릭 시 모달 열기
  const handleCardClick = (creator) => {
    setSelectedCreator(creator);
    setModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCreator(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        유사도 크리에이터 목록
      </Typography>
      <List>
        {similarityCreator.length > 0 ? (
          similarityCreator.map((creator, index) => (
            <CreatorCard 
              key={index}
              onClick={() => handleCardClick(creator)} // 카드 클릭 시 handleCardClick 호출
            >
              {/* 이미지 */}
              <CardImageContainer>
                <CardMedia
                  component="img"
                  height="200"
                  image={creator.imageUrl}
                  alt={creator.name}
                />
              </CardImageContainer>
              
              {/* 내용 */}
              <CardContent>
                <Typography variant="h6" component="div">
                  {creator.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {creator.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {creator.region} {creator.subregion}
                </Typography>
              </CardContent>
            </CreatorCard>
          ))
        ) : (
          <NoResult>검색 결과가 없습니다.</NoResult>
        )}
      </List>

      {/* 모달 */}
      <CreatorModal open={modalOpen} handleClose={handleCloseModal} creator={selectedCreator} />
    </Container>
  );
};

export default CreatorListComponent;