import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import NavMenu from './components/nav'
import NewOrder from './components/neworder'
import Loading from './components/loading'
import Login from './components/login'
import OrderList from './components/orderlist'
import RefreshToken from "./components/refresh";
import NotLogin from './components/notlogin'
import Mypage from './components/mypage'
import Footer from './components/footer'

const TOKEN = localStorage.getItem('eztoken')

function App(props) {

  RefreshToken();

  useEffect(() => {
    const url = window.location.href;
    const kakao_code = url.split('=')[1];
    console.log(kakao_code);
    if (kakao_code) {
      KakaoLogin(kakao_code)
    }
  }, [])

  const KakaoLogin = (code) => {
    axios.get(`http://localhost:8000/user/kakao/callback/?code=${code}`)
      .then((response) => {
        console.log(response.data);
        TokenGenerate(response.data.access, response.data.refresh)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const TokenGenerate = (access, refresh) => {
    localStorage.setItem('eztoken', access);
    localStorage.setItem('ezrefresh', refresh);
    setLoginTrue(true);
  }

  const LoginCheck = () => {
    if (TOKEN === null) {
      return false
    } else {
      return true
    }
  }

  const LoginCehck = () => {
    const TOKEN = localStorage.getItem('eztoken')
    if (TOKEN === null) {
      return false
    } else {
      return true
    }

  }

  const [Menu, setMenu] = useState('주문하기')
  const [LoginTrue, setLoginTrue] = useState(LoginCheck());
  const [Loading_on, setLoading_on] = useState(false);

  return (
    <div className="App">
      <NavMenu menu={Menu} setMenu={setMenu} LoginTrue={LoginTrue} setLoginTrue={setLoginTrue} />
      {Menu === '주문하기' && <NewOrder loadingon={setLoading_on} />}
      {Menu === '주문내역' ? LoginCehck() ? <OrderList loadingon={setLoading_on} /> : <NotLogin /> : null}
      {Menu === '마이페이지' ? LoginCehck() ? <Mypage /> : <NotLogin /> : null}
      {Menu === '로그인' && <Login LoginTrue={LoginTrue} setLoginTrue={setLoginTrue} />}
      {Loading_on === true && <Loading />}
      <Footer />
    </div>
  )
}

export default App
