import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async function(req, res){
    const {url} = req.body;
    if(req.user){
        const shortUrl = await createShortUrlWithUser(url, req.user._id)
    }else{
        const shortUrl = await createShortUrlWithoutUser(url)
    }
    const shortUrl = await createShortUrlWithoutUser(url);
    res.status(200).json({shortUrl: process.env.APP_URL  + shortUrl});
})

export const redirectFromShortUrl = wrapAsync(async function(req, res){
    const {id} = req.params;
    const url = await getShortUrl(id);

    if(!url) throw new Error("Short URL not found");
    res.redirect(url.full_url);
})

export const createCustomShortUrl = wrapAsync(async function(req, res){
    const {url, slug} = req.body; //customUrl = slug 
    const shortUrl = await createShortUrlWithoutUser(url, slug);
    res.status(200).json({shortUrl: process.env.APP_URL + '/' + shortUrl});
})
