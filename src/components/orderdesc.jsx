import { useEffect, useState } from 'react'
import './orderdesc.css'
import OrderInput from './orderinput'

function OrderDesc(props) {
    const [Desc, setDesc] = useState({
        // id: 1,
        // name: '인스타그램',
        // description: '인스타그램 팔로워를 늘려주는 서비스입니다.',
        // price: 1,
        // category: 1
    });

    const fontsizestyle = {
        fontSize: '1.0rem',
        fontWeight: 'bold',
        color: '#000000',
    }

    useEffect(
        () => {
            const data = props.OrderList.find((item) => item.id === props.OrderSelect)
            setDesc(data)
        }, [props]
    )
    return (
        <div>
            <div className="orderdesc">
                <div>
                    <div>가격</div>
                    <div>{(Desc === undefined ? '' : Desc.price)}</div>
                </div>
                <div>
                    <div>수량</div>
                    <div>{(Desc === undefined ? '' : Desc.min_quantity + '/' + Desc.max_quantity)}</div>
                </div>
                <div>
                    <div>이탈여부</div>
                    <div>{(Desc === undefined ? '' : '이탈없음')}</div>
                </div>
            </div>
            <OrderInput loadingon={props.loadingon}/>
        </div>

    )
}

export default OrderDesc;