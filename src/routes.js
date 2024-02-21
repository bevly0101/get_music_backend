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

setInterval(async()=>{
    generate_get_token.refresh_token()
    console.log('token refresh')
    const fs = require('node:fs/promises')
    const access_token = JSON.parse(await (await fs.readFile(path.resolve(__dirname,'token.json'))).toString())
    console.log(access_token.token)
},1000*60)


// get spotify token
Route.get('/',generate_get_token.send_token)
//generate spotify token for API
Route.get('/callback',generate_get_token.generate_token)

// search music on spofity
Route.get('/search',Reseacher_Spotify)

// search yotube video with his name.
Route.get('/search_musics',async(req,res)=>{
    const {title} = req.query
    const { search } = require('yt-getvideos');
    
    search(`${title}`).then(result => {
        res.json(result[0])
    });
})
// get music and downlaod it
Route.get('/dlMusic',Dl_Music)

// search playlist spotify
Route.get('/search_Pl',search_pl_spotify)

// search TY videos
Route.get('/searchYT',Search_YT_Video)

Route.get('/teste', async(req,res)=>{
    const { videoInfo } = require('yt-getvideos');
    videoInfo('tggg0rpFjeg').then(result => {
        res.send(result);
      });
    
})


module.exports = Route
