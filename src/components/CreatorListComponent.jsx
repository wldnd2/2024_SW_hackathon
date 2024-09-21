import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDatabase, ref, get } from 'firebase/database';
import app from '../firebase';
import CreatorList from '../constants/CreatorList';
import CreatorDetails from './CreatorDetails';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const KeywordList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreatorListComponent = () => {
  // const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarityCreator, setSimilarityCreator] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const rootRef = ref(db, '/top_creators'); // 루트 경로를 참조하여 전체 데이터를 가져옴

    get(rootRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("전체 데이터:", snapshot.val()); // 전체 데이터를 콘솔에 출력
          const top_creators = Object.values(snapshot.val()); // 객체를 배열로 변환하여 상태에 저장
          // setKeywords(top_creators);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h3>Similarity Creators:</h3>
      <KeywordList>
        {similarityCreator.length > 0 ? (
          similarityCreator.map((creator, index) => (
            <CreatorDetails key={index} creator={creator} extractedText="유사도 크리에이터" />
          ))
        ) : (
          <p>No similar creators found.</p>
        )}
      </KeywordList>
    </Container>
  );
};

export default CreatorListComponent;