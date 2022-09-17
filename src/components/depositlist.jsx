import { useState, useEffect } from "react";
import axios from "axios";
import ServerIP from "./server";
import './depositlist.css';

const SERVER_IP = ServerIP();

export default function DespositList() {
    const [DepositLists, setDepositLists] = useState([]);
    useEffect(() => {
        axios.get(`${SERVER_IP}/user/deposit/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('eztoken')}`
            }
        })
            .then(res => {
                console.log(res.data);
                res.data.map((item) => {
                    setDepositLists(DepositLists => [...DepositLists, item]);
                }
                )
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
    }, [])

    return (
        <div>
            <table className="desposit_table">
                <thead>
                    <tr>
                        <th>입금자명</th>
                        <th>입금액</th>
                        <th>상태</th>
                        <th>신청일</th>
                    </tr>
                </thead>
                <tbody>
                    {DepositLists.map((item, idex) => {
                        return (

                            <tr>
                                <td>{item.sendname}</td>
                                <td>{item.amount}원</td>
                                <td>{item.processing}</td>
                                <td>{item.created_at}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
