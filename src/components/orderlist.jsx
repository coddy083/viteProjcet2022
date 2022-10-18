import axios from "axios";
import React, { useEffect, useState } from "react";
import './style/orderlist.css'
import Orders from './orders'
import Search from "./search";
// import searchInput from "./search";
import Pages from "./orderpage";
import SearchOrders from './searchorders';

import Swal from 'sweetalert2'
import ServerIP from "./server";
import { useCallback } from "react";


const SERVER_IP = ServerIP()

const OrderList = (props) => {
  const [AllPages, setAllPages] = useState(0);
  const [Page, setPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [Searchs, setSearchs] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

  const SearchData = (value) => {
    axios.post(`${SERVER_IP}/order/order_search/`, {
        value: searchValue,
        page: Page
    }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('eztoken')}`
        }
    })
        .then(res => {
            console.log(res.data);
            setSearchs(true);
            setOrderList(res.data.data);
            setAllPages(res.data.all_pages);
        })
        .catch(err => {
            console.log(err);
            err.response.status === 401 && RefreshToken() && Swal.fire('로그인이 필요합니다.', '', 'error');
            err && console.log("에로야!");
        })
  }

  useEffect(() => {
    !Searchs && getOrderList();
    Searchs && SearchData();
  }, [Page]);

  const OrderData = (data) => {
    return (
      <Orders
        key={data.id}
        data={data}
        Searchs={Searchs}
      />
    )
  }

  return (
    <div className="order_list">
      <Search setOrderList={setOrderList} setSearchs={setSearchs} Searchs={Searchs} setAllPages={setAllPages} setPage={setPage} SearchData={SearchData} searchValue={searchValue} setSearchValue={setSearchValue}/>
      {orderList && orderList.map(OrderData)}
      <Pages AllPages={AllPages} Page={Page} setPage={setPage}/>
    </div>
  );
}

export default OrderList;