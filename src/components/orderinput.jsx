import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './orderinput.css';
import Swal from 'sweetalert2'

const SEVER_IP = 'http://127.0.0.1:8000'

function OrderInput(props) {
  const [OrderLink, setOrderLink] = useState('');
  const [OrderQuantity, setOrderQuantity] = useState('');
  const OrderClick = () => {
    props.loadingon(true);
    if (OrderLink === '' || OrderQuantity === '') {
      Swal.fire('주문정보를 입력해주세요.', '', 'error');
      props.loadingon(false);
    } else {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: `${OrderLink} 주문을 하시겠습니까?`,
        text: `수량은 ${OrderQuantity} 입니다.`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        confirmButtonText: '시작!',
        cancelButtonText: '취소!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '주문이 시작되었습니다.',
          )
          OrderSend();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '취소되었습니다.',
          )
          props.loadingon(false);
        }
      })
    }
  }

  const OrderSend = () => {
    const data = {
      "service": 2,
      "link": OrderLink,
      "quantity": OrderQuantity
    }
    axios.post(`${SEVER_IP}/order/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('eztoken')}`
      }
    })
      .then((response) => {
        props.loadingon(false);
        setOrderLink('');
        setOrderQuantity('');
      })
      .catch((err) => {
        err.response.status === 401 && alert('로그인이 필요합니다.');
        props.loadingon(false);
      })
  }

  return (
    <div className="order-input">
      링크<input value={OrderLink} onChange={(e) => { setOrderLink(e.target.value) }} placeholder='링크'></input>
      수량<input value={OrderQuantity} onChange={(e) => { setOrderQuantity(e.target.value) }} placeholder='수량'></input>
      <button onClick={OrderClick}>주문하기</button>
    </div>
  )
}

export default OrderInput;