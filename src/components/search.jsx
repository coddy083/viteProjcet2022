import Orders from './orders';
import { useState } from 'react';
import './style/search.css';

export default function Search(){
    const [Search, setSearch] = useState(false);

    const search = () => {
        console.log("검색");
    }

    return (
        <div className="search">
            <input type="text" placeholder="링크 및 날짜"/>
            <button onClick={search}>검색</button>
            {/* <Orders Search={Search} /> */}
        </div>
        
    )
}