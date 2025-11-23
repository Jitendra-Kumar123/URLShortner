import express from "express";
const app = express();
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/short_url.model.js";
import short_url from "./src/routes/short_url.route.js";
import dotenv from "dotenv";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"

app.use(cors());

dotenv.config("./.env");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, function(req, res){
    connectDB()
    console.log("Server is running on http://localhost:3000");
})