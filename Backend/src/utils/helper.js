import { nanoid } from "nanoid";
export const generateNanoId = function(length){
    return nanoid(length);
}