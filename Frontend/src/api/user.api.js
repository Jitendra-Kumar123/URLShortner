import axiosInstance from "../utils/axiosInstance"

export const loginUser = async function(password, email) {
   const {data} =  await axiosInstance.post("/api/auth/login",{password, email})
   return data
}

export const registerUser = async function(name, password, email) {
   const {data} =  await axiosInstance.post("/api/auth/register",{name, password, email})
   return data
}

export const logoutUser = async function() {
   const {data} =  await axiosInstance.get("/api/auth/logout")
   return data
}