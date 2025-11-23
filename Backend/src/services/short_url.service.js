import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async function(url){
    const shortUrl = await generateNanoId(7);
    if(!shortUrl){
        throw new Error("Short URL is not generated");
    }
    await saveShortUrl(shortUrl, url)
    return shortUrl
}
export const createShortUrlWithUser = async function(url, userId){
    const shortUrl = await generateNanoId(7);
    await saveShortUrl(shortUrl, url, userId)
    return shortUrl
}
