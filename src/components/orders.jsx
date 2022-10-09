import './style/order.css'

function Orders(props) {
    return (
        <div className='orders'>
            <div className='service_name'>{props.service_name.name}</div>
            <div className='order'>{props.link}</div>
            <div className='order_status'>
                <div>시작 {props.start_count}</div>
                <div>주문 {props.quantity}</div>
                <div>남음 {props.remains}</div>
                <div
                    style={props.status === '완료' ? { background: '#FFB200', color: 'white' } : { background: 'red', color: 'white' }}
                >{props.status}</div>
            </div>
            <div>{props.create_date}</div>
        </div>
    )
}

export default Orders