import Orders from './orders';
import { useState, useRef } from 'react';
import './style/search.css';
import axios from 'axios';
import ServerIP from "./server";

const SERVER_IP = ServerIP()

export default function Search({ SearchData, searchValue, setSearchValue, setPage }) {
    const search = () => {
        setPage(1);
        SearchData();
    }

    return (
        <div className="search">
            <input type="text" 
                value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value) }}
                placeholder="링크 및 날짜" />
            <button onClick={search}>검색</button>
        </div>
    )
}