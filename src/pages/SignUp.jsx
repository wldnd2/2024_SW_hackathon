// SignUp.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login_signup.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('상인');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPw('');
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

  const handleSignUp = () => {
    const userData = { name, role, email, pw };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  return (
    <div className="page">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        <div className="inputTitle">이름</div>
        <div className="inputWrap">
          <input 
          className="input" 
          type="text" 
          placeholder="이름을 입력하세요" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          autoComplete="off" />
        </div>

        <div className="inputTitle">역할 선택</div>
        <div className="inputWrap">
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="상점">상점</option>
            <option value="크리에이터">로컬 크리에이터</option>
          </select>
        </div>

        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input className="input" 
          type="text" 
          placeholder="test@gmail.com" 
          value={email} 
          onChange={handleEmail} 
          autoComplete="off" />
        </div>
        <div className="errorMessageWrap">{!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}</div>

        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input className="input" 
          type="password" 
          placeholder="영문, 숫자, 특수문자 포함 8자 이상" 
          value={pw} 
          onChange={handlePw}
          autoComplete="off"  />
        </div>
        <div className="errorMessageWrap">{!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}</div>
      </div>

      <div>
        <button onClick={handleSignUp} disabled={!emailValid || !pwValid} className="bottomButton">
          회원가입
        </button>
      </div>
    </div>
  );
}
