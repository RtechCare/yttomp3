// required packages
const youtubeid = require('get-youtube-id'); 
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

// create the epress server
const app = express();

// server port number
const PORT = process.env.PORT || 80 ;

// set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

API_KEY = 'cecd2dc69dmshd9c83744f6a04f6p18fb3cjsn0776cddc35c1'
API_HOST = 'youtube-mp3-download1.p.rapidapi.com'

// this is needed to parse html data for Post request

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.get("/copyright", (req, res) => {
    res.render("copyright")
})
app.get("/privacy-policy", (req, res) => {
    res.render("privacy-policy")
})
app.get("/terms", (req, res) => {
    res.render("terms")
})

app.post("/convert-mp3", async (req, res) => {
    const videoId = youtubeid(req.body.videoID);

    if(
        videoId === undefined ||
        videoId === "" ||
        videoId === null
    ){
        return res.render("index", {success : false, message : "please enter a video ID"});

    }else{
        const fetchAPI = await fetch(`https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`, {
            "method" : "GET",
            "headers" : {
                "x-rapidapi-key" : API_KEY,
                "x-rapidapi-host" : API_HOST
            }
        });

       const  fetchResponse = await fetchAPI.json();
       
       if(fetchResponse.status === "ok")
            return res.render("index", {success : true, song_title: fetchResponse.title, song_link : fetchResponse.link });
        else
        return res.render("index", {success: false, message : fetchResponse.msg});

    }
});

//start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

});