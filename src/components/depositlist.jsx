import { useState, useEffect } from "react";
import axios from "axios";
import ServerIP from "./server";
import './depositlist.css';

const SERVER_IP = ServerIP();

const Style = {
    backgroundColor: "red",
    color: "white",
}

export default function DespositList(props) {
    const [DepositLists, setDepositLists] = useState([]);
    const [Page, setPage] = useState(1);
    const [PageCount, setPageCount] = useState(0);
    useEffect(() => {
        axios.get(`${SERVER_IP}/user/deposit/?page=${Page}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('eztoken')}`
            }
        })
            .then(res => {
                console.log(res.data.count);
                setDepositLists([])
                setPageCount(res.data.count/4)
                res.data.results.map((item, index) => {
                    setDepositLists(DepositLists => [...DepositLists, item]);
                })
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
    }, [props.ReceipInfoComplete, Page])

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
                    {DepositLists.map((item, index) => {
                        return (

                            <tr key={index}>
                                <td>{item.sendname}</td>
                                <td>{item.amount}원</td>
                                <td>{item.processing}</td>
                                <td>{item.date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="page">
                <button onClick={() => {
                    Page > 1 && setPage(Page - 1)
                }}>이전</button>
                <button onClick={() => {
                    Page < PageCount && setPage(Page + 1)
                }}>다음</button>
            </div>
        </div>
    )
}
