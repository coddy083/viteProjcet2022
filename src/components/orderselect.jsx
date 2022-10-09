import './style/orderselect.css'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import OrderDesc from './orderdesc'
import ServerIP from './server'

const SERVER_IP = ServerIP()

function OrderSelect(props) {
    const [OrderList, setOrderList] = useState([])

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
                            <li onClick={() => { setOrderSelect(order.id) }} className={order.id === OrderSelect ? 'order_selected' : ''} key={index}>
                                {order.name}
                                </li>
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