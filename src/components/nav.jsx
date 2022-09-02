import './nav.css';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

function NavMenu(props) {
    const MenuList = ['주문하기', '주문내역', '마이페이지'];
    const MenuSelect = useRef('주문하기');

    const handleClick = (e) => {
        props.setMenu(e.target.innerText);
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
            <div>XXX님 로그아웃</div>
        </div>
    )
}
export default NavMenu;