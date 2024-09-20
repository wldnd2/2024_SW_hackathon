// Login.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login_signup.css';
/*const User = {
  email: 'woorin@gmail.com',
  pw: 'woorin1313!A'
};*/

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();

  // 페이지가 로드될 때 이메일과 비밀번호를 초기화
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
      /*로그인 후 새로운 페이지 이동*/ 
      navigate('/');
    } else {
      alert('등록되지 않은 회원입니다.');
    }
  };

  return (
    <div className="page">
      <div className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요
      </div>

      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
            autoComplete="off"  
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
            autoComplete="off"
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>

        {/* "계정이 없으신가요?" 텍스트와 회원가입 버튼 */}
        <div className="signupWrap">
          <span className="signupText">계정이 없으신가요?</span>
          <button
            onClick={() => navigate('/signup')}
            className="signupButton"
          >
            회원가입
          </button>
        </div>
        <div className="underline"></div>
       
      </div>

      <div>
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          className="bottomButton"
        >
          확인
        </button>
      </div>
    </div>
  );
}
