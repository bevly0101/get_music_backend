module.exports = async function Search_Playlist_Spotify(req,res){
    const axios = require('axios')
    const fs = require('node:fs/promises')
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
                    img: i.track.album.images[0].url,
                    artist: i.track.album.artists[0].name
                })
            })
            return tracks

        }
        const essential_data = {
            pl_img : data_playlist.images[0].url,
            tracks : Tracks() ,
            playlist_name: data_playlist.name,
            playlist_length: data_playlist.tracks.total
        }
        res.send(essential_data)
    }
    catch(e){
        const ERROR_TAG = {
            "TypeError: Cannot read properties of undefined (reading 'split')": 'verfique se o link está correto, há algo de errado ai',
            "AxiosError: Request failed with status code 400" : 'Verifique se o link está correto!'
        }
        console.log('err0:'+e)
        res.send({erro:ERROR_TAG[e]})
    }
}