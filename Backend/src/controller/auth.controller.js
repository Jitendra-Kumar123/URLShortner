import { cookieOptions } from "../config/config.js"
import { registerUser, loginUser } from "../services/auth.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const register_user = wrapAsync (async function(req, res){
    const{name, email, password} = req.body
    const token = await registerUser(name, email, password)

    req.user = user
    res.cookie("accessTsoken", token, cookieOptions)
    res.status(200).json({message: "login success"})
})

export const login_user = wrapAsync (async function(req, res){
    const{email, password} = req.body
    const token = await loginUser( email, password)
    
    req.user = user
    res.cookie("accessTsoken", token, cookieOptions)
    res.status(200).json({message: "login success"})
})

