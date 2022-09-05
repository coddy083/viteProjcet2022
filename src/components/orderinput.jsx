import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './orderinput.css';

const SEVER_IP = 'http://127.0.0.1:8000'
const TOKEN = `Bearer ${localStorage.getItem('eztoken')}`

function OrderInput(props) {
    const [OrderLink, setOrderLink] = useState('');
    const [OrderQuantity, setOrderQuantity] = useState('');
    const OrderClick = () => {
        props.loadingon(true);
        OrderSend();
        setOrderLink('');
        setOrderQuantity('');
    }

    const OrderSend = () => {
      const data = {
        "service": 2,
        "link": OrderLink,
        "quantity": OrderQuantity
      }
      axios.post(`${SEVER_IP}/order/`, data, {
        headers: {
          'Authorization': TOKEN
        }
      })
        .then((response) => {
          console.log(response);
          props.loadingon(false);
        })
        .catch((error) => {
          console.log(error);
          props.loadingon(false);
        })
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