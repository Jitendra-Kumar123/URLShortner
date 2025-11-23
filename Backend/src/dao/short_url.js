import { ConflictError } from "openai"
import urlSchema from "../models/short_url.model.js"
export const saveShortUrl = async function (shortUrl, longUrl, userId){
    try{
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl,
        })
        if(userId){
            newUrl.user_id = userId
        }
       await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists");
        }
        throw new Error(err);
        // next(err);
    }

}

export const getShortUrl = async function(id){
    return await urlSchema.findOneAndUpdate({short_url: id},{$inc:{clicks:1}})
}
