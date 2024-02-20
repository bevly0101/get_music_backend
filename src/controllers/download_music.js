module.exports= async function Dl_Music(req,res){
    const YoutubeMusicApi = require('youtube-music-api')
    const api = new YoutubeMusicApi()
    const ytdl = require('ytdl-core');
    api.initalize().then(info => {
        if(req.query.type==='name'){
            api.search(`${req.query.title} official music & lyric`,'video').then(result => {
                const videoID = (result.content.filter(v=>v.type==='video'))[0].videoId
                res.header("Content-Disposition", `attachment; filename="${req.query.title}.mp3`);
                ytdl(`http://www.youtube.com/watch?v=${videoID}`,{format:'webm', quality:'highestaudio'}).on('data', data=>{}).pipe(res)
                res.closed
            })
        }
        if(req.query.type==='id'){
            res.header("Content-Disposition", `attachment; filename="${req.query.title}.mp3`);
            ytdl(`http://www.youtube.com/watch?v=${req.query.id}`,{format:'webm', quality:'highestaudio'}).on('data', data=>{}).pipe(res)
            res.closed
        }
    })
}