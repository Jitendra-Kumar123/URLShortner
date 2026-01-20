import wrapAsync from "../utils/tryCatchWrapper.js";
import {getAllUserUrls} from "../dao/user.dao.js"

export const getAllUserUrls = wrapAsync(async(req, res) => {
    const {_id} = req.user
    const urls = await getAllUserUrls(_id.toString())
    res.status(200).json({message: "success", urls})
})