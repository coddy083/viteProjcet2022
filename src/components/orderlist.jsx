import axios from "axios";
import React, { useEffect, useState } from "react";
import './orderlist.css'
import Orders from './orders'
import Swal from 'sweetalert2'

const SERVER_IP = 'http://127.0.0.1:8000';


const OrderList = (props) => {
  const [orderList, setOrderList] = useState();

  const getOrderList = () => {
    props.loadingon(true);
    axios.get(`${SERVER_IP}/order/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('eztoken')}`
      }
    })
      .then(res => {
        setOrderList(res.data);
        props.loadingon(false);
      })
      .catch(err => {
        err.response.status === 401 && RefreshToken() && Swal.fire('로그인이 필요합니다.', '', 'error');
        err && console.log("에로야!");
        props.loadingon(false);
      })
  }

  useEffect(() => {
    getOrderList();
  }, []);

  const OrderData = (data) => {
    return (
      <Orders
        key={data.id}
        id={data.id}
        link={data.link}
        quantity={data.quantity}
        remains={data.remains}
        start_count={data.start_count}
        status={data.status}
        service_name={data.service_name}
        create_date={data.create_date}
      />
    )
  }

  return (
    <div className="order_list">
      {/* <h1>주문내역</h1> */}
      {orderList && orderList.map(OrderData)}
    </div>
  );
}

export default OrderList;