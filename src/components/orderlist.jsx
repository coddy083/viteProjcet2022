import axios from "axios";
import React, { useEffect, useState } from "react";
import './orderlist.css'
import Orders from './orders'
import Swal from 'sweetalert2'

const SERVER_IP = 'http://49.247.148.170:8000';

const OrderList = (props) => {
  const [AllPages, setAllPages] = useState(0);
  const [Page, setPage] = useState(1);
  const [orderList, setOrderList] = useState();

  const getOrderList = () => {
    props.loadingon(true);
    axios.get(`${SERVER_IP}/order/${Page}/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('eztoken')}`
      }
    })
      .then(res => {
        setAllPages(res.data.all_pages);
        setOrderList(res.data.data);
        props.loadingon(false);
      })
      .catch(err => {
        err.response.status === 401 && RefreshToken() && Swal.fire('로그인이 필요합니다.', '', 'error');
        err && console.log("에로야!");
        props.loadingon(false);
      })
  }

  useEffect(() => {
    console.log(Page);
    getOrderList();
  }, [Page]);

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
      <div className="order_list_page">
        <div className="order_list_page_left">
          <button className="order_list_page_left_button" onClick={() => Page > 1 && setPage(Page - 1)}>이전</button>
        </div>
        <div className="order_list_page_center">
          <div className="order_list_page_center_text">
            {Page} / {AllPages}
          </div>
        </div>
        <div className="order_list_page_right">
          <button className="order_list_page_right_button" onClick={() => Page < AllPages && setPage(Page + 1)}>다음</button>
        </div>
      </div>
      {orderList && orderList.map(OrderData)}
    </div>
  );
}

export default OrderList;