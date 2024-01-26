module.exports = function Search_YT_Video(req,res){
    const YoutubeMusicApi = require('youtube-music-api')
    const api = new YoutubeMusicApi()
    
    res.header("Access-Control-Allow-Origin", "*");
    api.initalize().then(info => {
        api.search(`${req.query.title}`,null,10).then(result => {
            const CONTENT_DATA = [];
            (result.content.filter(v=>v.type==='video')).forEach(t => {
                const {name:video_name,author,thumbnails:{url:thumbnail}, videoId, duration} = t
                CONTENT_DATA.push({name:video_name,author,thumbnail, videoId, duration:(()=>{
                    const time = `${(duration/60).toFixed()}`
                    return time
                })()})
            });
            res.send(CONTENT_DATA)
        })
    })
}