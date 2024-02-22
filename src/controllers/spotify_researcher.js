module.exports = async function Reseacher_Spotify(req,res){
    const Refresh_Token = require('./generate&get_token').refresh_token;
    const fs = require('node:fs/promises')
    const axios = require('axios');
    const path = require('path');
    const access_token = await Refresh_Token.then(t=>t);
    //console.log('success token!!!!!!!')
    
    res.header("Access-Control-Allow-Origin", "*");
    const {t} = req.query
    console.log(`alguem pesquisou por [ ${t} ]`)
    try{
        const  response = await axios.get(`https://api.spotify.com/v1/search?q=${t}&type=track&limit=3`,{
            headers:{
                Authorization: `Bearer ${access_token.token}`
            }
        }).then(e=>JSON.stringify(e.data))
        const data_music = JSON.parse(response)

        //console.log(data_music.tracks.items)
        const essential_data = []
        const walk_tracks = (data_music.tracks.items).forEach(t=>{
            essential_data.push({
                name: t.name,
                image:t.album.images[0].url,
                artist:(()=>{
                    let artists = ''
                    t.album.artists.forEach(e => {artists+=(e.name + ', ')});
                    return artists
                })()
            })
        })
        res.json(essential_data)
    }
    catch(e){
        console.log(e)
                
    }
}
