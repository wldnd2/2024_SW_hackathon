import React, { useEffect, useState } from 'react'
import { useNavigate, useParams  } from 'react-router-dom';
import '../styles/index.css';

export default function MatchingDetail() {
    const navigate = useNavigate();  // useNavigate 훅 사용

    // 버튼 클릭 시 Search로 이동
    const handleSubmit = () => {
      navigate('/search');  // '/search' 경로로 이동
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
  
    return (
      <div className="page">
        <h1 className='titleWrap'>{creator.name}</h1>
        <p>{creator.item}</p>
        <p>지역: {creator.region} {creator.subregion}</p>
        <p>가격대: {creator.priceRange}</p>
        <p>생산 용량: {creator.productionCapacity}</p>
        <p><a href={creator.homepage} target="_blank" rel="noopener noreferrer">{creator.homepage}</a></p>


        <div className="bottomButtonWrap">
          <button 
            className='bottomButton'
            onClick={handleSubmit}>
            목록
          </button>
        </div> 
      </div>
    );
  }