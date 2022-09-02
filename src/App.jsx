import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavMenu from './components/nav'
import NewOrder from './components/neworder'
import Loading from './components/loading'

function App() {
  const [Menu, setMenu] = useState('주문하기')
  const [Loading_on, setLoading_on] = useState(false)

  return (
    <div className="App">
      <NavMenu menu={Menu} setMenu={setMenu} />
      {Menu === '주문하기' && <NewOrder loadingon={setLoading_on} />}
      {Menu === '주문내역' && <div>주문내역</div>}
      {Menu === '마이페이지' && <div>마이페이지</div>}
      {Loading_on === true && <Loading />}
    </div>
  )
}

export default App
