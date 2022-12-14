import './style/order_info.css';

export default function OrderInfo() {
    return (
        <div className="orderinfo_box">
            <div className="orderinfo">
            <p className="info_text"><img className="info_icon" src="https://cdn-icons-png.flaticon.com/512/6155/6155575.png" alt=""  />주문전 링크와 금액을 꼭 확인해 주세요.</p>
            <p className="info_text"><img className="info_icon" src="https://cdn-icons-png.flaticon.com/512/6237/6237783.png" alt="" />중복된 링크는 완료전에 주문하지 마세요.</p>
            <p className="info_text"><img className="info_icon" src="https://cdn-icons-png.flaticon.com/512/2268/2268490.png" alt=""  />이탈 발생시 30일 동안 리필 진행해 드립니다.</p>
            <p className="info_text"><img className="info_icon" src="https://cdn-icons-png.flaticon.com/512/3501/3501758.png" alt=""  />주문 시작이 안될시 카톡문의 주시면 확인 도와 드리겠습니다.</p>
            <p className="info_text"><img className="info_icon" src="https://cdn-icons-png.flaticon.com/512/2972/2972543.png" alt=""  />서버 지연으로 최대 24시간 주문이 지연될수 있습니다.</p>
        </div>
        </div>
    )
}