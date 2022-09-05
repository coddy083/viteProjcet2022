import './nav.css';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

function NavMenu(props) {
    const MenuList = ['주문하기', '주문내역', '마이페이지'];
    
    const handleClick = (e) => {
        props.setMenu(e.target.innerText);
    }
    const LoginClick = () => {
        props.setMenu('로그인');
    }

    const LogoutClick = () => {
        localStorage.removeItem('eztoken');
        localStorage.removeItem('ezrefresh');
        props.setLoginTrue(false);
    }

    return (
        <div className="navmenu">
            {MenuList.map((menu, index) => {
                return (
                    <div key={index}
                        onClick={handleClick} className={menu === props.menu ? 'menu_active' : ''} >
                        {menu}
                    </div>
                )
            })}
            { props.LoginTrue === false ?  <div onClick={LoginClick}>로그인</div> : <div onClick={LogoutClick}>로그아웃</div>}
        </div>
    )
}
export default NavMenu;