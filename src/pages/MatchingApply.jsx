import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

export default function MatchingApply() {

  const navigate = useNavigate();  // useNavigate 훅 사용

  // 버튼 클릭 시 home 이동
  const handleSubmit = () => {
    navigate('/');  // '/' 경로로 이동
  };
  
  return (
    <div className="page">
      <div className="titleWrap">
        매칭 신청 작성 페이지
      </div>

      <div className='contentWrap'>
        <div className='inputTitle'>협업 제안서</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='협업을 원하는 상품 종류, 제작 방식, 일정 등'/>
        </div>

        <div style={{marginTop: "26px"}} className='inputTitle'>희망 협업 방식 선택</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='번들 상품 제작, 한정판 상품 기획, 커스터마이징 옵션 제공 등.' />
        </div>

        <div className="bottomButtonWrap">
          <button 
            className='bottomButton'
            onClick={handleSubmit}>
            신청
          </button>
        </div>
              </div>
    </div>
  )
}