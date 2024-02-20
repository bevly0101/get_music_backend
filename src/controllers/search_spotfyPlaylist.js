module.exports = async function Search_Playlist_Spotify(req,res){
    const axios = require('axios')
    const fs = require('node:fs/promises')
    const path = require('path')

    const access_token = JSON.parse(await (await fs.readFile('src/token.json')).toString())
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const ID_playlist = req.query.id.split('/playlist/')[1].split('?')[0]
        console.log(ID_playlist)
        const  response = await axios.get(`https://api.spotify.com/v1/playlists/${ID_playlist}`,{
            headers:{
                Authorization: `Bearer ${access_token.token}`
            }
        }).then(e=>JSON.stringify(e.data))
        const data_playlist = JSON.parse(response)

        const Tracks=()=>{
            const tracks = []
            data_playlist.tracks.items.filter(i=>{
                tracks.push({
                    name:i.track.name,
                    img: i.track.album.images[0].url || 'oi' ,
                    artist: i.track.album.artists[0].name
                })
            })
            return tracks

        }
        const essential_data = {
            pl_img : data_playlist.images[0].url || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Flightwidget.com%2Ffile-not-found-error-on-local&psig=AOvVaw0i9bm2emHC1ufduIYgyKnf&ust=1706663271699000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCFkqL2g4QDFQAAAAAdAAAAABAF',
            tracks : Tracks() ,
            playlist_name: data_playlist.name || 'your playlist name is loading',
            playlist_length: data_playlist.tracks.total
        }
        res.send(essential_data)
    }
    catch(e){
        const ERROR_TAG = {
            "TypeError: Cannot read properties of undefined (reading 'split')": 'verfique se o link está correto, há algo de errado ai',
            "AxiosError: Request failed with status code 400" : 'Verifique se o link está correto!'
        }
        console.log('err0:'+ e)
        
        res.send({erro:ERROR_TAG[e] || 'aconteceu alguma coisa'})
    }
}