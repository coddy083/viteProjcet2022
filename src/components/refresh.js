import axios from "axios"

const RefreshToken = () => {
    const refreshToken = localStorage.getItem("ezrefresh")
    axios.post("http://localhost:8000/user/refresh/", {
        "refresh": refreshToken
    }).then(res => {
        console.log(res.data)
        localStorage.setItem("eztoken", res.data.access)
        
    }).catch(err => {
        console.log(err)
    })
}

export default RefreshToken