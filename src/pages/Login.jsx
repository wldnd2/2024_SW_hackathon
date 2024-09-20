import { useEffect, useState } from 'react';
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

const SignupWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const SignupText = styled.span`
    font-size: 14px;
    color: #262626;
    margin-right: 5px;
`;

const SignupButton = styled.button`
    background: none;
    border: none;
    color: #30c3f4;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPw('');
  }, []);

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

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

  const onClickConfirmButton = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && email === storedUser.email && pw === storedUser.pw) {
      alert('로그인에 성공했습니다.');
      navigate('/');
    } else {
      alert('등록되지 않은 회원입니다.');
    }
  };

  return (
    <Page>
      <TitleWrap>
        이메일과 비밀번호를
        <br />
        입력해주세요
      </TitleWrap>

      <ContentWrap>
        <InputTitle>이메일 주소</InputTitle>
        <InputWrap>
          <Input
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
            autoComplete="off"
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </ErrorMessageWrap>

        <InputTitle style={{ marginTop: "26px" }}>비밀번호</InputTitle>
        <InputWrap>
          <Input
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
            autoComplete="off"
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </ErrorMessageWrap>

        <SignupWrap>
          <SignupText>계정이 없으신가요?</SignupText>
          <SignupButton onClick={() => navigate('/signup')}>
            회원가입
          </SignupButton>
        </SignupWrap>
        <div className="underline"></div>
      </ContentWrap>

      <div style={{ marginTop: "50px" }}>
        <BottomButton onClick={onClickConfirmButton} disabled={notAllow}>
          확인
        </BottomButton>
      </div>
    </Page>
  );
}