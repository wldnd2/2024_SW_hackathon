import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    overflow: hidden;
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

export default function SignUp() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('상인');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [phone, setPhone] = useState('');  
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const navigate = useNavigate();

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

  const handleSignUp = () => {
    const userData = { name, role, email, pw };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('회원가입이 완료되었습니다.');
    navigate('/login');
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
        
        <InputTitle>전화번호</InputTitle>  {/* 전화번호 입력 필드 추가 */}
        <InputWrap>
          <Input 
            type="text" 
            placeholder= "010-XXXX-XXXX 또는 053-XXXX-XXXX"
            value={phone} 
            onChange={handlePhone}
            autoComplete="off" />
        </InputWrap>
        <ErrorMessageWrap>{!phoneValid && phone.length > 0 && <div>올바른 전화번호를 입력해주세요.</div>}</ErrorMessageWrap>
      
      </ContentWrap>

      <div style={{ marginTop: "50px" }}>
        <BottomButton onClick={handleSignUp} disabled={!emailValid || !pwValid || !phoneValid}>
          회원가입
        </BottomButton>
      </div>
    </Page>
  );
}