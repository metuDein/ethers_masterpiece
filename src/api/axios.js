import axios from "axios";

const baseURL = 'http://localhost:3500'
// const baseURL = 'https://ethers-masterpiece-backend.onrender.com'

export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})


export const axiosPrivate = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
