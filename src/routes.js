const express = require('express')
const Route = express.Router();
const request = require('request');
const path = require('path');


//### import controllers
const Reseacher_Spotify = require('./controllers/spotify_researcher')
const generate_get_token = require('./controllers/generate&get_token')
const Dl_Music = require('./controllers/download_music')
const search_pl_spotify = require('./controllers/search_spotfyPlaylist')
const Search_YT_Video = require('./controllers/search_youtubeAudios')


// get spotify token
Route.get('/',generate_get_token.send_token);
// generate spotify token for API
Route.get('/callback',generate_get_token.generate_token);

// search music on spofity
Route.get('/search',Reseacher_Spotify);

// search yotube video with his name.
Route.get('/search_musics',async(req,res)=>{
    const {title} = req.query
    const { search } = require('yt-getvideos');
    
    search(`${title}`).then(result => {
        res.json(result[0])
    });
})
// get music and downlaod it
Route.get('/dlMusic',Dl_Music);

// search playlist spotify
Route.get('/search_Pl',search_pl_spotify);

// search TY videos
Route.get('/searchYT',Search_YT_Video);

// teste
Route.get('/teste',async(req,res)=>{
    const videoID = 'Egi0WwnbByk'
    const ytdl = require('ytdl-core');
    const inf = await  ytdl.getInfo(videoID,{downloadURL: true})
    const inf_need = (inf.formats.filter(f=>f.mimeType.includes('audio/webm'))).filter(f=>f.audioQuality==="AUDIO_QUALITY_MEDIUM")
    res.redirect(inf_need[0].url)
})


module.exports = Route
