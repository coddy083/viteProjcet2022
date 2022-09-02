import React, {useState, useEffect} from 'react';
import './orderinput.css';

function OrderInput(props) {
    const [OrderLink, setOrderLink] = useState('');
    const [OrderQuantity, setOrderQuantity] = useState('');
    const OrderClick = () => {
        console.log(OrderLink, OrderQuantity);
        setOrderLink('');
        setOrderQuantity('');
        // props.loadingon(true);
    }

  return (
    <div className="order-input">
        링크<input value={OrderLink} onChange={(e)=>{setOrderLink(e.target.value)}} placeholder='링크'></input>
        수량<input value={OrderQuantity} onChange={(e)=>{setOrderQuantity(e.target.value)}} placeholder='수량'></input>
        <button onClick={OrderClick}>주문하기</button>
    </div>
  )
}

export default OrderInput;