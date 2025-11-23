import axios from "axios"
import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async function(url) {
   const {data} =  await axiosInstance.post("/api/create",{url})
   return data.shortUrl
}