import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async function(url){
    const shortUrl =  generateNanoId(7);
    if(!shortUrl){
        throw new Error("Short URL is not generated");
    }
    await saveShortUrl(shortUrl, url)
    return shortUrl
}
export const createShortUrlWithUser = async function(url, userId, slug=null){
    const shortUrl = slug ||  generateNanoId(7);
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("this custom url already exists")

    await saveShortUrl(shortUrl,url, userId)
    return shortUrl
}

