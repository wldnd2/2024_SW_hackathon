import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, TextField, Select, MenuItem, Card, CardContent, CardMedia } from '@mui/material';
import CreatorList from '../constants/CreatorList'; // 크리에이터 데이터 가져오기

const Page = styled.div`
  padding: 20px;
`;

const SearchWrap = styled.div`
  margin-bottom: 20px;
`;

const FilterWrap = styled.div`
  margin-bottom: 20px;
`;

const CreatorListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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

export default function Search() {
  const [creators, setCreators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // 데이터 불러오기
  useEffect(() => {
    setCreators(CreatorList);
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
      <Typography variant="h4" component="div" gutterBottom>
        크리에이터 검색 및 필터링 페이지
      </Typography>

      {/* 검색창 */}
      <SearchWrap>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="상점 이름을 검색하세요"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchWrap>

      {/* 필터 섹션 */}
      <FilterWrap>
        <Select
          fullWidth
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>카테고리</em>
          </MenuItem>
          <MenuItem value="지역가치">지역가치</MenuItem>
          <MenuItem value="로컬푸드">로컬푸드</MenuItem>
          <MenuItem value="지역기반제조">지역기반제조</MenuItem>
          <MenuItem value="디지털문화체험">디지털문화체험</MenuItem>
        </Select>
      </FilterWrap>

      {/* 크리에이터 목록을 카드 형식으로 표시 */}
      <CreatorListContainer>
        {filteredCreators.length > 0 ? (
          filteredCreators.map((creator, index) => (
            <CreatorCard 
              key={index}
              onClick={() => handleCardClick(creator.id)} // 카드 클릭 시 handleCardClick 호출
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
                  {extractItemTitle(creator.item)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  분야: {creator.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  지역: {creator.region} {creator.subregion}
                </Typography>
              </CardContent>
            </CreatorCard>
          ))
        ) : (
          <NoResult>검색 결과가 없습니다.</NoResult>
        )}
      </CreatorListContainer>
    </Page>
  );
}