import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./login2.css";

function Login2() {
  const navigate = useNavigate();
  const [studentNum, setStudentNum] = useState('');
  const [password, setPassword] = useState('');

  const fetchURL = "https://port-0-swuniforest-be-1mrfs72llwd799yh.sel5.cloudtype.app/";

  const handleLoginClick = async () => {
    const data = {
      studentNum,
      password
    };
  
    try {
      const response = await axios.post(fetchURL + 'api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // 토큰과 역할(role) 저장
      const token = response.data.token;
      const role = response.data.role;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
      console.log('로그인 성공');
  
      // 역할에 따라 페이지 이동
      if (role === 'ROLE_MANAGER') {
        navigate('/stamp_admin');
      } else {
        navigate('/');
      }
  
    } catch (error) {
      if (error.response) {
        console.error('Error:', error);
        if (error.response.status === 400) {
          // 비밀번호 불일치
          alert('비밀번호가 일치하지 않습니다.');
        } else if (error.response.status === 404) {
          // 존재하지 않는 회원
          alert('존재하지 않는 회원입니다.');
        } else if (error.response.status === 500) {
          // 서버 오류
          alert('로그인 중 오류가 발생했습니다.');
        }
      } else {
        console.error('Error:', error);
        alert('네트워크 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="iphone-frame">
      <p className="login-title">로그인</p>
      <img
        src="../../../img/close.png"
        alt="취소버튼"
        className="close-btn"
        style={{ marginTop: "9%" }}
        onClick={() => navigate('/')}
      />
      <div style={{ marginTop: "260px" }}>
        <p className="stId">학번</p>
        <input
          className="input"
          value={studentNum}
          onChange={(e) => setStudentNum(e.target.value)}
          style={{fontSize:"20px"}}
        />
        <div style={{ width: "360px", height: "0.6px", background: "#E3E3E3", marginTop: "0px" }}></div>

        <p className="stPw">비밀번호</p>
        <input
          className="input"
          type="password"
          value={password}
          style={{fontSize:"20px"}}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ width: "360px", height: "0.6px", background: "#E3E3E3", marginTop: "0px" }}></div>
      </div>

      <p style={{ marginTop: "110px" }}>아직도 모바일 열람증 인증을 하지 않으셨나요?</p>
      <button onClick={() => { navigate('/signup1') }} className="L2signupBtn">
        <div style={{ color: "#898A8D" }}>회원가입하기</div>
      </button>

      <button onClick={handleLoginClick} className="confirmButton1">
        <b style={{ fontSize: "20px", color: "#ffffff" }}>확인</b>
      </button>
    </div>
  );
}

export default Login2;