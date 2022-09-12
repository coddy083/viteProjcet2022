import './mypage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faP } from "@fortawesome/free-solid-svg-icons";

function Mypage() {
    return( 
        <div className='mypage'> 
            <div className='user'>유저 admin</div>
            <div className='point'>포인트 1000</div>
        </div>
    )
}

export default Mypage