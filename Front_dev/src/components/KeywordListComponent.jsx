// src/components/UserKeywords.jsx
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDatabase, ref, get } from 'firebase/database';
import app from '../firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const KeywordList = styled.div`
  width: 600px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Keyword = styled.div`
  width: 80%;
  background-color: #A7E6FF;
  border-radius: 12px;
  padding: 8px 12px;
  margin: 5px 10px; /* 세로로 나열되도록 위아래로 마진을 줌 */
  display: flex;
  justify-content: center;
  width: 100%; /* 키워드가 컨테이너의 전체 너비를 차지하도록 설정 */
`;

const KeywordListComponent = () => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const rootRef = ref(db, '/users/cM4X745Og8YVwmpaPckIvcbRTc33/keywords'); // 루트 경로를 참조하여 전체 데이터를 가져옴

    get(rootRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("전체 데이터:", snapshot.val()); // 전체 데이터를 콘솔에 출력
          setKeywords(snapshot.val());
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
      <h3>Your Keywords:</h3>
      <KeywordList>
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <Keyword key={index}>{keyword}</Keyword>
          ))
        ) : (
          <p>No keywords found.</p>
        )}
      </KeywordList>
    </Container>
  );
};

export default KeywordListComponent;