/*
const Search = () => {
  return (
    <div>
      <h1>Search</h1>
    </div>
  );
}

export default Search;
*/
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

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

  // 버튼 클릭 시 MatchingDetail으로 이동
  const handleSubmit = () => {
    navigate('/apply');  // '/detail' 경로로 이동
  };

  // 아이템명 추출
  const extractItemTitle = (item) => {
    const match = item.match(/“([^“”]+)”/);
    return match ? match[1] : item;  // "" 안의 텍스트를 추출, 없으면 전체 반환
  };

  return (
    <div className="page">
      <div className="titleWrap">
        크리에이터 검색 및 필터링 페이지
      </div>

      {/* 검색창 */}
      <div className="searchWrap">
        <input
          type="text"
          className="searchInput"
          placeholder="상점 이름을 검색하세요"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* 필터 섹션 */}
      <div className="filterWrap">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">카테고리</option>
          <option value="지역가치">지역가치</option>
          <option value="로컬푸드">로컬푸드</option>
          <option value="지역기반제조">지역기반제조</option>
          <option value="디지털문화체험">디지털문화체험</option>
        </select>
      </div>

      {/* 크리에이터 목록을 카드 형식으로 표시 */}
      <div className="creatorList">
        {filteredCreators.length > 0 ? (
          filteredCreators.map((creator, index) => (
            
            <div 
              className="creatorCard" 
              key={index}
              onClick={() => handleCardClick(creator.id)} // 카드 클릭 시 handleCardClick 호출
              style={{ cursor: 'pointer' }} // 마우스 커서가 포인터로 바뀌도록 스타일 추가
            >
              {/* 이미지 */}
              <div className="cardImageContainer">
                <img src={creator.imageUrl} alt={creator.name} className="creatorImage" />
              </div>
              
              {/* 내용 */}
              <div className="cardContent">
                <h3>{creator.name}</h3>
                <p>{extractItemTitle(creator.item)}</p>
                <p>분야: {creator.category}</p>
                <p>지역: {creator.region} {creator.subregion}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="noResult">검색 결과가 없습니다.</div>
        )}
      </div>
      <div className="bottomButtonWrap">
          <button 
            className='bottomButton' 
            onClick={handleSubmit}>
            다음
          </button>
        </div>
    </div>
  );
}