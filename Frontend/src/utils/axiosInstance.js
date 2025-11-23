import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    timeout:10000
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Axios response error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            })
        } else if (error.request) {
            console.error('Axios no response received:', error.request)
        } else {
            console.error('Axios error:', error.message)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
