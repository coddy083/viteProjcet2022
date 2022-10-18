import { useEffect } from 'react'
import './style/order.css'

function SearchOrders(props) {
    useEffect(
        () => {
            console.log(props.Searchs);
        }, []
    )

    return (
        <div className='orders'>
            <div className='order'><a href={props.data.link} target="_blank" rel="noreferrer">{props.data.link}</a></div>
            <div className='order_status'>
                <div>시작 {props.data.start_count}</div>
                <div>주문 {props.data.quantity}</div>
                <div>남음 {props.data.remains}</div>
                <div>{props.data.price}P</div>
                <div
                    style={props.data.status === '완료' ? { background: '#FFB200', color: 'white' } : { background: 'red', color: 'white' }}
                >{props.data.status}</div>
            </div>
            <div>{props.data.create_date}</div>
        </div>
    )
}

export default SearchOrders