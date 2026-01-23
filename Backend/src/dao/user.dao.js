import User from "../models/user.model.js"
import shortUrl from "../models/short_url.model.js"

export const findUserByEmail = async (email) => {
    return await User.findOne({email})
}

export const findUserById = async (id) => {
    return await User.findById(id)
}

export const createUser = async (name, email, password) => {
    const newUser = new User({name, email, password})
    await newUser.save()
    return newUser
}

export const getAllUserUrlsDao = async(id) => {
    return await shortUrl.find({user: id})
}
