import React, { useState } from "react"
import OrderSelect from "./orderselect"
import OrderInput from './orderinput'
import OrderDesc from './orderdesc'
import './neworder.css'

function NewOrder(props) {
    const Services = ['인스타그램', '유튜브', '네이버']
    const [Orderchoice, setOrderchoice] = useState(Services[0])

    return (
        <div>
            <div className="neworder">
                {Services.map((service, index) => (
                    <button
                        key={index}
                        onClick={() => setOrderchoice(service)}
                        className={Orderchoice === service ? 'selected' : ''} // 선택된 버튼은 selected 클래스를 추가
                    >
                        {service}
                    </button>
                ))}
            </div>
            <OrderSelect orderchoice={Orderchoice} services={Services}/>
            <OrderDesc />
            <OrderInput loadingon={props.loadingon} />
        </div>
    )

}

export default NewOrder;