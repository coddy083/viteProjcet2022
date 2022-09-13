import axios from "axios"
import Swal from "sweetalert2"

const SERVER_IP = 'http://49.247.148.170:8000';

const RefreshToken = () => {
    const refreshToken = localStorage.getItem("ezrefresh")
    axios.post(`${SERVER_IP}/user/refresh/`, {
        "refresh": refreshToken
    }).then(res => {
        localStorage.setItem("eztoken", res.data.access)
    }).catch(err => {
        console.log(err)
        (err.response.status === 0 ? 
        Swal.fire({
            icon: "error",
            title: "서버에러!",
            text: "잠시 후 다시 시도해주세요.",
            // footer: "<A href='<Login />'>Login</A>"
        })
        :
        console.log(err.response.status)
        )
    })
}

export default RefreshToken