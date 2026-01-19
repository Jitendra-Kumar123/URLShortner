import wrapAsync from "../utils/tryCatchWrapper.js";
import { getShortUrl } from "../dao/short_url.js";

export const getAllUserUrls = wrapAsync(async(req, res) => {
    const {_id} = req.user
    const urls = await getShortUrl(_id)
    res.status(200).json({message: "success", urls})
})