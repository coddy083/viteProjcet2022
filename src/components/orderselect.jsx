import './orderselect.css'
import React, { useRef, useState } from 'react'

function OrderSelect(props) {
    const OrderList = ['외국인 좋아요', '외국인 팔로워', '한국인 좋아요', '한국인 팔로워', '동영상 조회수', '피드 노출도달']
    const [OrderSelect, setOrderSelect] = useState('')

    const Order_Selectd = (e) => {
        setOrderSelect(e.target.innerText)
    }

    if (props.orderchoice === props.services[0]) {
        return (
            <div className='orderselect'>
                <ul>
                    {OrderList.map((order, index) => {
                        return (
                            <li onClick={Order_Selectd} className={order === OrderSelect ? 'selected' : ''} key={index}>{order}</li>
                        )
                    }
                    )}
                </ul>
            </div>
        )
    } else if (props.orderchoice === props.services[1]) {
        return (
            <div className='orderselect'>
                <ul>
                    {OrderList.map((order, index) => {
                        return (
                            <li key={index}>{order}</li>
                        )
                    }
                    )}
                </ul>
            </div>
        )
    } else if (props.orderchoice === props.services[2]) {
        return (
            <div className='orderselect'>
                <ul>
                    {OrderList.map((order, index) => {
                        return (
                            <li key={index}>{order}</li>
                        )
                    }
                    )}
                </ul>
            </div>
        )
    }
}

export default OrderSelect;