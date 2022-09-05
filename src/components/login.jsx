import React, {useState} from 'react';
import axios from 'axios';
import './login.css';

const SERVER_IP = 'http://127.0.0.1:8000';

function Login(props) {
    const [LoginId, setLoginId] = useState('');
    const [LoginPw, setLoginPw] = useState('');


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
            .catch((error) => {
                console.log(error);
            })
    }

    const TokenGenerate = (access, refresh) => {
        console.log(access, refresh);
        localStorage.setItem('eztoken', access);
        localStorage.setItem('ezrefresh', refresh);
        props.setLoginTrue(true);
    }
    return (
        <div className="login_modal">
            <h1>로그인</h1>
            <input type="text" value={LoginId} onChange={(e) => { setLoginId(e.target.value) }} placeholder='아이디'></input>
            <input type="password" value={LoginPw} onChange={(e) => { setLoginPw(e.target.value) }} placeholder='비밀번호'></input>
            <button onClick={Signin}>로그인</button>
        </div>
    );
}

export default Login;