import React, { useEffect, useState } from "react"
import OrderSelect from "./orderselect"
import './style/neworder.css'
import axios from "axios"
import ServerIP from "./server"

const SERVER_IP = ServerIP()

function NewOrder(props) {
    const [Services, setServices] = useState([
        {id: 1, name: '인스타그램'},
        {id: 2, name: '유튜브'},
        {id: 3, name: '네이버'}
    ])
    const [Orderchoice, setOrderchoice] = useState(Services[0].id)

    useEffect(() => {
        axios.get(`${SERVER_IP}/order/category/`)
            .then(res => {
                setServices(
                    res.data.map((item) => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                )
            })
            .catch(err => {
                console.log("neworder.jsx: ", err)
            })
    }, [])

    return (
        <div>
            <div className="neworder">
                {Services.map((service, index) => (
                    <button
                        key={index}
                        onClick={() => setOrderchoice(service.id)}
                        className={Orderchoice === service.id ? 'selected service_button' : 'service_button'} // 선택된 버튼은 selected 클래스를 추가
                    >
                        {service.name}
                    </button>
                ))}
            </div>
            <OrderSelect orderchoice={Orderchoice} services={Services} loadingon={props.loadingon}/>
        </div>
    )

}

export default NewOrder;