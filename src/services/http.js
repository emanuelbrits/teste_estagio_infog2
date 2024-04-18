import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://api-manager-test.infog2.com.br.infog2.com.br/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance