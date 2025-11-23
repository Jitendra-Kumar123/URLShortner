import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async function(req, res, next){
    const {url} = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.status(200).json({shortUrl: process.env.APP_URL + '/' + shortUrl});
})

export const redirectFromShortUrl = wrapAsync(async function(req, res, next){
    const {id} = req.params;
    const url = await getShortUrl(id);

    if(!url) throw new Error("Short URL not found");
    res.redirect(url.full_url);
})
