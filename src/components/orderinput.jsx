import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/orderinput.css';
import Swal from 'sweetalert2'
import ServerIP from './server';
import OrderInfo from './order_info';

const SERVER_IP = ServerIP()

function OrderInput(props) {
  console.log(props);
  const [OrderLink, setOrderLink] = useState('');
  const [OrderQuantity, setOrderQuantity] = useState('');
  const OrderClick = () => {
    props.loadingon(true);
    if (OrderLink === '' || OrderQuantity === '' || props.Desc === undefined) {
      Swal.fire('주문정보를 입력해주세요.', '');
      props.loadingon(false);
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn_success',
          cancelButton: 'btn_danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: `${props.Desc.name}<p>${OrderLink}</p>`,
        text: `서비스 이용료 ${OrderQuantity*props.Desc.price}P 를 차감하고 주문하시겠습니까?`,
        // text: `금액은 ${OrderQuantity*props.Desc.price}P 입니다.`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        confirmButtonText: '시작',
        cancelButtonText: '취소',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
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
      "service": props.Desc.id,
      "link": OrderLink,
      "quantity": OrderQuantity
    }
    axios.post(`${SERVER_IP}/order/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('eztoken')}`
      }
    })
      .then((response) => {
        props.loadingon(false);
        Swal.fire('주문이 완료되었습니다.', '', 'success');
        setOrderLink('');
        setOrderQuantity('');
      })
      .catch((err) => {
        err.response.status === 401 && Swal.fire('로그인이 필요합니다.');
        err.response.status === 400 && Swal.fire('주문에 실패하였습니다.');
        props.loadingon(false);
      })
  }

  return (
    <div className="order-input">
      <OrderInfo />
      링크<input type="text" value={OrderLink} onChange={(e) => { setOrderLink(e.target.value) }} placeholder='링크'></input>
      수량<input type="number" value={OrderQuantity} onChange={(e) => { setOrderQuantity(e.target.value) }} placeholder='수량'></input>
      <button className='service_button' onClick={OrderClick}>주문하기</button>
    </div>
  )
}

export default OrderInput;