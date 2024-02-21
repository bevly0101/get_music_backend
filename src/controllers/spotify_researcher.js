module.exports = async function Reseacher_Spotify(req,res){
    const Refresh_Token = require('./generate&get_token').refresh_token;
    const fs = require('node:fs/promises')
    const axios = require('axios');
    const path = require('path');
    const access_token = await Refresh_Token.then(t=>t)  //JSON.parse(await (await fs.readFile(path.resolve(__dirname,'..','token.json'))).toString())
    console.log('success token!!!!!!!')
    
    res.header("Access-Control-Allow-Origin", "*");
    const {t} = req.query
    try{
        const  response = await axios.get(`https://api.spotify.com/v1/search?q=${t}&type=track&limit=3`,{
            headers:{
                Authorization: `Bearer ${access_token.token}`
            }
        }).then(e=>JSON.stringify(e.data))
        const data_music = JSON.parse(response)
        
        const essential_data = {
            name: data_music.tracks.items[0].name,
            image: data_music.tracks.items[0].album.images[0].url,
            artist:(()=>{
                let artists = ''
                data_music.tracks.items[0].album.artists.forEach(e => {
                    artists+=(e.name + ', ')
                });
                return artists
            })()
        }
        res.json(essential_data)
    }
    catch(e){
        console.log(e)
                
    }
}
