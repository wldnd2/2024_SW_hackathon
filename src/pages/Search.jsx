import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.div`
  padding: 20px;
`;

const TitleWrap = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SearchWrap = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FilterWrap = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CreatorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const CreatorCard = styled.div`
  width: calc(33.333% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
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

const CreatorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 10px;
`;

const NoResult = styled.div`
  text-align: center;
  color: #999;
  font-size: 18px;
  margin-top: 20px;
`;

export default function Search() {
  const [creators, setCreators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // 데이터 불러오기
  useEffect(() => {
    // 데이터를 JSON 파일에서 불러오는 fetch 함수
    fetch('/creators.json')
      .then(response => response.json())
      .then(data => setCreators(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // 검색 및 필터링된 크리에이터 목록
  const filteredCreators = creators.filter((creator) => {
    return (
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!categoryFilter || creator.category === categoryFilter)
    );
  });

  const navigate = useNavigate();  // useNavigate 훅 사용

  // 검색창 핸들러
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 각 크리에이터 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  // 아이템명 추출
  const extractItemTitle = (item) => {
    const match = item.match(/“([^“”]+)”/);
    return match ? match[1] : item;  // "" 안의 텍스트를 추출, 없으면 전체 반환
  };

  return (
    <Page>
      <TitleWrap>
        크리에이터 검색 및 필터링 페이지
      </TitleWrap>

      {/* 검색창 */}
      <SearchWrap>
        <SearchInput
          type="text"
          placeholder="상점 이름을 검색하세요"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchWrap>

      {/* 필터 섹션 */}
      <FilterWrap>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">카테고리</option>
          <option value="지역가치">지역가치</option>
          <option value="로컬푸드">로컬푸드</option>
          <option value="지역기반제조">지역기반제조</option>
          <option value="디지털문화체험">디지털문화체험</option>
        </Select>
      </FilterWrap>

      {/* 크리에이터 목록을 카드 형식으로 표시 */}
      <CreatorList>
        {filteredCreators.length > 0 ? (
          filteredCreators.map((creator, index) => (
            <CreatorCard 
              key={index}
              onClick={() => handleCardClick(creator.id)} // 카드 클릭 시 handleCardClick 호출
            >
              {/* 이미지 */}
              <CardImageContainer>
                <CreatorImage src={creator.imageUrl} alt={creator.name} />
              </CardImageContainer>
              
              {/* 내용 */}
              <CardContent>
                <h3>{creator.name}</h3>
                <p>{extractItemTitle(creator.item)}</p>
                <p>분야: {creator.category}</p>
                <p>지역: {creator.region} {creator.subregion}</p>
              </CardContent>
            </CreatorCard>
          ))
        ) : (
          <NoResult>검색 결과가 없습니다.</NoResult>
        )}
      </CreatorList>
    </Page>
  );
}