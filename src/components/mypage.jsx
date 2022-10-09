import './style/mypage.css'
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect } from 'react';
import ServerIP from './server';
import DespositList from './depositlist';

const SERVER_IP = ServerIP()

function Mypage() {
    const [ChargeMoney, setChargeMoney] = useState(0);
    const [Depositor, setDepositor] = useState("");
    const [Receipt, setReceipt] = useState(false);
    const [ReceiptInfo, setReceiptInfo] = useState("0");
    const [ReceipInfoComplete, setReceipInfoComplete] = useState(false);
    const [User, setUser] = useState({
        "username": "...",
        "point": "...",
    });

    useEffect(() => {
        axios.get(`${SERVER_IP}/user/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('eztoken')}`
            }
        })
            .then(res => {
                setUser({
                    "username": res.data.username,
                    "point": res.data.point,
                })
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
    }, [])


    const Desposit = (e) => {
        e.preventDefault();
        if (ChargeMoney === 0 || Depositor === "") {
            Swal.fire('입금자명과 금액을 입력해주세요.', '');
        } else {
            const data = {
                "amount": ChargeMoney,
                "sendname": Depositor,
                "receiptinfo": ReceiptInfo,
            }
            axios.post(`${SERVER_IP}/user/deposit/`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('eztoken')}`
                }
            })
                .then(res => {
                    console.log(res.data);

                    Swal.fire('입금 신청이 완료 되었습니다.', '');
                    setReceipInfoComplete(true);
                }
                )
                .catch(err => {
                    err.response.data.message && Swal.fire(err.response.data.message, '');
                }
                )
        }
    }

    return (
        <div>
            <div className='mypage'>
                <div className='user'><span>유저</span>{User.username}</div>
                <div className='point'><span>포인트</span>{User.point}</div>
            </div>
            <div className='despoit'>
                <h1>금액 충전</h1>
                <h4>우리은행 123-456-789</h4>
                <p>예금주 이민기</p>
                <select onChange={(e) => { setChargeMoney(e.target.value) }}>
                    <option value="0">충전금액</option>
                    <option value="5000">5000</option>
                    <option value="10000">10000</option>
                    <option value="20000">20000</option>
                    <option value="30000">30000</option>
                    <option value="50000">50000</option>
                    <option value="100000">100000</option>
                </select>
                <input onChange={(e) => { setDepositor(e.target.value) }} type="text" placeholder='입금자명' />
                {/* 현금영수증 체크 버튼 */}
                <div className='receipt'>
                    <input onChange={(e) => { e.target.checked ? setReceipt(true) : setReceipt(false) }} type="checkbox" id="receipt" />
                    <label htmlFor="receipt">현금영수증 발행</label>
                    <div>
                        {Receipt ? <input type="text" onChange={(e) => { setReceiptInfo(e.target.value) }} placeholder='전화번호 혹은 사업자번호' /> : null}
                    </div>
                </div>
                <input onClick={Desposit} type="submit" value="충전하기" />
            </div>
            <DespositList ReceipInfoComplete={ReceipInfoComplete} />
        </div>
    )
}

export default Mypage