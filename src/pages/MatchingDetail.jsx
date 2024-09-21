import { useEffect, useState } from 'react'
import { useNavigate, useParams  } from 'react-router-dom';
import '../styles/index.css';

export default function MatchingDetail() {
    const navigate = useNavigate();  // useNavigate 훅 사용

    // 버튼 클릭 시 Search로 이동
    const handleSearch = () => {
      navigate('/search');  // '/search' 경로로 이동
    };

    // 버튼 클릭 시 Search로 이동
    const handleSelect = () => {
      navigate('/apply', { state: { creatorId: creator.id } });  // '/search' 경로로 이동
    };
    
    const { id } = useParams();  // URL에서 ID 가져옴
    const [creator, setCreator] = useState(null);
  
    useEffect(() => {
      // 데이터에서 해당 ID의 크리에이터를 찾아서 보여줌
      fetch('/creators.json')
        .then(response => response.json())
        .then(data => {
          const foundCreator = data.find((item) => item.id === parseInt(id));
          setCreator(foundCreator);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [id]);
  
    if (!creator) {
      return <div>로딩 중...</div>;
    }

    const extractedText = creator.item.match(/“([^“”]+)”/)[1];
  
    return (
      <div className="page">
        {/* 이미지 URL이 있을 경우에만 이미지를 렌더링 */}
        {creator.imageUrl && (
          <div className="imageContainer">
            <img src={creator.imageUrl} alt={creator.name} className="creatorImage" />
            <div className="creatorName">{creator.name}</div>
          </div>
        )}

      <div className="creatorContent">
        <p>7대 분야: {creator.category}</p>
        <p>아이템: {extractedText}</p>
        <p>아이템 설명: {creator.item}</p>
        <p>지역: {creator.region} {creator.subregion}</p>
        <p>홈페이지: <a href={creator.homepage} target="_blank" rel="noopener noreferrer">{creator.homepage}</a></p>
      </div>

        <div className="bottomButtonWrap">
          <button 
            className='bottomButton'
            onClick={handleSearch}>
            목록 보기
          </button>
        </div> 

        <div className="bottomButtonWrap">
          <button 
            className='selectButton'
            onClick={handleSelect}>
            매칭 신청하기
          </button>
        </div> 
      </div>
    );
  }