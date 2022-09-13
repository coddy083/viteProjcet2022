import './orderselect.css'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import OrderDesc from './orderdesc'

const SERVER_IP = 'http://49.247.148.170:8000';

function OrderSelect(props) {
    const [OrderList, setOrderList] = useState([
        { id: 1, name: '인스타그램', description: '인스타그램 팔로워를 늘려주는 서비스입니다.', price: 1, category: 1, min_quantity: 100, max_quantity: 1000 },
    ])

    useEffect(() => {
        axios.get(`${SERVER_IP}/order/service/${props.orderchoice}/`)
            .then(res => {
                setOrderList(
                    res.data.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            price: item.price,
                            category: item.category,
                            min_quantity: item.min_quantity,
                            max_quantity: item.max_quantity,
                        }
                    }
                    )
                )
            }
            )
    }, [props.orderchoice])

    const [OrderSelect, setOrderSelect] = useState('')

    return (
        <div>
            <div className='orderselect'>
                <ul>
                    {OrderList.map((order, index) => {
                        return (
                            <li onClick={() => { setOrderSelect(order.id) }} className={order.id === OrderSelect ? 'selected' : ''} key={index}>{order.name}</li>
                        )
                    }
                    )}
                </ul>
            </div>
            <OrderDesc OrderSelect={OrderSelect} OrderList={OrderList} loadingon={props.loadingon}/>
        </div>



    )
}

export default OrderSelect;