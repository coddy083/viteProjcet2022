import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import Swal from 'sweetalert2'
import ServerIP from './server';

const SERVER_IP = ServerIP()

function Login(props) {
    const [LoginId, setLoginId] = useState('');
    const [LoginPw, setLoginPw] = useState('');
    const [Signup, setSignup] = useState(true);
    const [SignupId, setSignupId] = useState('');
    const [SignupPw, setSignupPw] = useState('');
    const [SignupPwCheck, setSignupPwCheck] = useState('');
    const [SignupEmail, setSignupEmail] = useState('');

    const Signin = () => {
        const data = {
            username: LoginId,
            password: LoginPw
        }
        axios.post(`${SERVER_IP}/user/signin/`, data)
            .then((response) => {
                TokenGenerate(response.data.access, response.data.refresh);
                window.location.reload();
            })
            .catch((err) => {
                err.response.status === 401 && Swal.fire('아이디 또는 비밀번호가 일치하지 않습니다.', '', 'error');
            })
    }

    const TokenGenerate = (access, refresh) => {
        console.log(access, refresh);
        localStorage.setItem('eztoken', access);
        localStorage.setItem('ezrefresh', refresh);
        props.setLoginTrue(true);
    }

    const SignupSubmit = () => {
        if (SignupPw !== SignupPwCheck) {
            Swal.fire('비밀번호가 일치하지 않습니다.', '', 'error');
        } else {
            const data = {
                username: SignupId,
                password: SignupPw,
                email: SignupEmail
            }
            axios.post(`${SERVER_IP}/user/`, data)
                .then((response) => {
                    console.log(response);
                    Swal.fire('회원가입이 완료되었습니다.', '', 'success');
                    setSignup(true);
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire('회원가입에 실패하였습니다.', '', 'error');
                })
        }
    }


    return (
        Signup ? 
         <div className="login_modal">
            <h1>로그인</h1>
            <input type="text" value={LoginId} onChange={(e) => { setLoginId(e.target.value) }} placeholder='아이디'></input>
            <input type="password" value={LoginPw} onChange={(e) => { setLoginPw(e.target.value) }} placeholder='비밀번호'></input>
            <button onClick={Signin}>로그인</button>
        </div>
        :
        <div className="login_modal">
            <h1>회원가입</h1>
            <input type="text" value={SignupId} onChange={(e) => { setSignupId(e.target.value) }} placeholder='아이디'></input>
            <input type="text" value={SignupEmail} onChange={(e) => { setSignupEmail(e.target.value) }} placeholder='이메일주소'></input>
            <input type="password" value={SignupPw} onChange={(e) => { setSignupPw(e.target.value) }} placeholder='비밀번호'></input>
            <input type="password" value={SignupPwCheck} onChange={(e) => { setSignupPwCheck(e.target.value) }} placeholder='비밀번호 확인'></input>
            <button onClick={SignupSubmit}>회원가입</button>
        </div>
    )
}
export default Login;