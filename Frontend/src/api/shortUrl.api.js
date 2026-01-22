import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async function(url, slug) {
   const {data} =  await axiosInstance.post("/api/create",{url, slug})
   return data.shortUrl
}

export const getUserUrls = async function() {
   const {data} = await axiosInstance.get("/api/user/urls")
   return data
}

export const deleteUrl = async function(id) {
   const {data} = await axiosInstance.delete(`/api/urls/${id}`)
   return data
}

export const getUrlStats = async function(id) {
   const {data} = await axiosInstance.get(`/api/urls/${id}/stats`)
   return data
}