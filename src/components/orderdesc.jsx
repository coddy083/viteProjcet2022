import './orderdesc.css'

function OrderDesc() {
    const fontsizestyle = {
        fontSize: '1.0rem',
        fontWeight: 'bold',
        color: '#000000',
    }
    return (
        <div className="orderdesc">
            <div>
                <div>가격</div>
                <div>1P</div>
            </div>
            <div>
                <div>수량</div>
                <div>10/10000</div>
            </div>
            <div>
                <div>이탈여부</div>
                <div>이탈없음</div>
            </div>
        </div>
    )
}

export default OrderDesc;