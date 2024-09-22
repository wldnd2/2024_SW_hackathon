import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';

import app, { db } from '../firebase';

const Page = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    padding: 0 20px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #F7F7F7;
`;

const TitleWrap = styled.div`
    margin-top: 87px;
    font-size: 26px;
    font-weight: bold;
    color: #262626;
`;

const ContentWrap = styled.div`
    margin-top: 26px;
    flex: 1;
`;

const InputTitle = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: #262626;
`;

const InputWrap = styled.div`
    display: flex;
    border-radius: 8px;
    padding: 16px;
    margin-top: 8px;
    margin-bottom: 16px;
    background-color: white;
    border: 1px solid #e2e0e0;

    &:focus-within {
        border: 1px solid #9e30f4;
    }
`;

const Input = styled.input`
    width: 100%;
    outline: none;
    border: none;
    height: 17px;
    font-size: 14px;
    font-weight: 400;

    &::placeholder {
        color: #dadada;
    }
`;

const Select = styled.select`
    width: 100%;
    outline: none;
    border: none;
    height: 17px;
    font-size: 14px;
    font-weight: 400;
    background-color: transparent;
`;

const BottomButton = styled.button`
    width: 100%;
    height: 48px;
    border: none;
    font-weight: bold;
    border-radius: 64px;
    background-color: #30b3f4;
    color: white;
    margin-bottom: 16px;
    cursor: pointer;

    &:disabled {
        background-color: #dadada;
        color: white;
    }
`;

const ErrorMessageWrap = styled.div`
    margin-top: 8px;
    color: #ef0000;
    font-size: 12px;
`;

// 키워드 스타일
const KeywordContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
`;

const KeywordButton = styled.button`
    background-color: ${({ selected }) => (selected ? '#30b3f4' : '#f0f0f0')};
    color: ${({ selected }) => (selected ? '#fff' : '#000')};
    border: 1px solid #ccc;
    border-radius: 24px;
    padding: 8px 16px;
    margin: 4px;
    cursor: pointer;

    &:disabled {
        background-color: #dadada;
        color: #fff;
        cursor: not-allowed;
    }
`;

const auth = getAuth(app);

export default function SignUp() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('상인');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [phone, setPhone] = useState('');  
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]); // 선택된 키워드
  const navigate = useNavigate();

  const keywords = ['제조','스마트','반려동물','식품','섬유','한약','육아','공구','아트','체험','전시회','다이어트','페스티벌','의류','신소재','빵','주얼리','화훼','업사이클링','트렌드', '가족', '여행', '문화', '스포츠', '음악', '음식', '자연', '기술', '건강'];

  useEffect(() => {
    setEmail('');
    setPw('');
    setPhone('');
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(e.target.value));
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    setPwValid(regex.test(e.target.value));
  };

  const handlePhone = (e) => {
    const cleanedValue = e.target.value.replace(/\s+/g, '');
    setPhone(cleanedValue);
    const regex = /^(010|053)-\d{4}-\d{4}$/;
    setPhoneValid(regex.test(cleanedValue));
  };

  const handleKeywordSelect = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else if (selectedKeywords.length < 5) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  // Firebase로 회원가입 처리 및 데이터베이스에 저장
  const handleSignUp = async () => {
    try {
      // Firebase Authentication에 사용자 등록
      const createdUser = await createUserWithEmailAndPassword(auth, email, pw);
      console.log('회원가입 성공:', createdUser);

      alert('회원가입 성공!');

      // auth.currentUser가 있는지 확인 후 프로필 업데이트
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Firebase Realtime Database에 사용자 추가 정보 저장
        const userId = createdUser.user.uid;
        await set(ref(db, 'users/' + userId), {
          name: name,
          role: role,
          phone: phone,
          keywords: selectedKeywords,
        });

        console.log('사용자 정보 저장 완료:', {
          name: name,
          role: role,
          phone: phone,
          keywords: selectedKeywords,
        });

        // 회원가입 후 로그인 페이지로 이동
        navigate('/login');
      }
    } catch (error) {
      // 이메일 중복 오류 처리
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 사용 중인 이메일입니다. 다른 이메일을 입력하세요.');
      } else {
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Page>
      <TitleWrap>회원가입</TitleWrap>
      <ContentWrap>
        <InputTitle>이름</InputTitle>
        <InputWrap>
          <Input 
          type="text" 
          placeholder="이름을 입력하세요" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          autoComplete="off" />
        </InputWrap>

        <InputTitle>역할 선택</InputTitle>
        <InputWrap>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="상점">상점</option>
            <option value="크리에이터">로컬 크리에이터</option>
          </Select>
        </InputWrap>

        <InputTitle>이메일 주소</InputTitle>
        <InputWrap>
          <Input 
          type="text" 
          placeholder="test@gmail.com" 
          value={email} 
          onChange={handleEmail} 
          autoComplete="off" />
        </InputWrap>
        <ErrorMessageWrap>{!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}</ErrorMessageWrap>

        <InputTitle>비밀번호</InputTitle>
        <InputWrap>
          <Input 
          type="password" 
          placeholder="영문, 숫자, 특수문자 포함 8자 이상" 
          value={pw} 
          onChange={handlePw}
          autoComplete="off"  />
        </InputWrap>
        <ErrorMessageWrap>{!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}</ErrorMessageWrap>
        
        <InputTitle>전화번호</InputTitle>  
        <InputWrap>
          <Input 
            type="text" 
            placeholder="010-XXXX-XXXX 또는 053-XXXX-XXXX"
            value={phone} 
            onChange={handlePhone}
            autoComplete="off" />
        </InputWrap>
        <ErrorMessageWrap>{!phoneValid && phone.length > 0 && <div>올바른 전화번호를 입력해주세요.</div>}</ErrorMessageWrap>

        <InputTitle>관심 키워드 (최대 5개 선택)</InputTitle>
        <KeywordContainer>
          {keywords.map((keyword) => (
            <KeywordButton
              key={keyword}
              onClick={() => handleKeywordSelect(keyword)}
              selected={selectedKeywords.includes(keyword)}
              disabled={selectedKeywords.length >= 5 && !selectedKeywords.includes(keyword)}
            >
              {keyword}
            </KeywordButton>
          ))}
        </KeywordContainer>
        <ErrorMessageWrap>{selectedKeywords.length === 0 && <div>최소 1개의 키워드를 선택하세요.</div>}</ErrorMessageWrap>
      
      </ContentWrap>

      <div style={{ marginTop: "50px" }}>
        <BottomButton 
          onClick={handleSignUp} 
          disabled={!emailValid || !pwValid || !phoneValid || selectedKeywords.length === 0}>
          회원가입
        </BottomButton>
      </div>
    </Page>
  );
}
