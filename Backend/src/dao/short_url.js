import urlSchema from "../models/short_url.model.js"
export const saveShortUrl = async function (shortUrl, longUrl, userId){
    try{
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl,
        })
        if(userId){
            newUrl.user = userId
        }
       await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new Error("Short URL already exists");
        }
        throw new Error(err);
        // next(err);
    }

}

export const getShortUrl = async function(shortUrl){
    return await urlSchema.findOneAndUpdate({short_url: shortUrl},{$inc:{clicks:1}})
}

export const getCustomShortUrl = async function(slug){
   return await urlSchema.findOneAndUpdate({short_url: slug}) 
}
