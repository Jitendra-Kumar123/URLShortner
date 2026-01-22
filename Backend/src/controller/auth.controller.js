import { cookieOptions } from "../config/config.js"
import { registerUser, loginUser } from "../services/auth.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const register_user = wrapAsync (async function(req, res){
    const{fullName, email, password} = req.body
    const {token, user} = await registerUser(fullName, email, password)

    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({message: "registration success"})
})

export const login_user = wrapAsync (async function(req, res){
    const{email, password} = req.body
    const {token, user} = await loginUser( email, password)

    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({message: "login success"})
})

export const logout_user = wrapAsync(async function(req, res){
    res.clearCookie("accessToken")
    res.status(200).json({message: "logout success"})
})

export const get_current_user = wrapAsync(async (req, res) => {
    res.status(200).json({user: req.user})
})
