import './mypage.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faP, faReceipt } from "@fortawesome/free-solid-svg-icons";

function Mypage() {
    const [ChargeMoney, setChargeMoney] = useState(0);
    const [Depositor, setDepositor] = useState("");
    const [Receipt, setReceipt] = useState(false);
    const [ReceiptInfo, setReceiptInfo] = useState("");

    const SelectChange = (e) => {
        console.log(ChargeMoney, Depositor);
    }

    return(
        <div> 
        <div className='mypage'> 
            <div className='user'><span>유저</span>admin</div>
            <div className='point'><span>포인트</span>1000</div>
        </div>
        <div className='despoit'>
        <h1>금액 충전</h1>
        <h4>우리은행 123-456-789</h4>
        <p>예금주 이민기</p>
        <select onChange={(e)=>{setChargeMoney(e.target.value)}}>
            <option value="0">충전금액</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="4000">4000</option>
            <option value="5000">5000</option>
        </select>
        <input onChange={ (e) => {setDepositor(e.target.value)} } type="text" placeholder='입금자명' />
        {/* 현금영수증 체크 버튼 */}
        <div className='receipt'>
            <input onChange={(e)=>{e.target.checked ? setReceipt(true) : setReceipt(false)}} type="checkbox" id="receipt" /> 
            <label for="receipt">현금영수증 발행</label>
            {Receipt ? <input type="text" onChange={(e)=>{setReceiptInfo(e.target.value)}} placeholder='전화번호 혹은 사업자번호' /> : null}
        </div>
        <input type={ChargeMoney && Depositor ? "submit" : "button"} value="입금확인" onClick={SelectChange} />
        </div>
        </div>
    )
}

export default Mypage