module.exports= async function Dl_Music(req,res){
    const YoutubeMusicApi = require('youtube-music-api')
    const api = new YoutubeMusicApi()
    const ytdl = require('ytdl-core');
    api.initalize().then(async info => {
        if(req.query.type==='name'){
            api.search(`${req.query.title} official music & lyric`,'video').then(async result => {
                const videoID = (result.content.filter(v=>v.type==='video'))[0].videoId
                res.attachment(`${req.query.title}.mp3`);
                const stream = await ytdl(`http://www.youtube.com/watch?v=${videoID}`,{format:'webm', quality:'highestaudio',filter:'audioonly'})
                //const funcao = stream.listeners('erro')[2];
                //stream.removeListener('erro',funcao);
                stream.on('data',data=>{}).pipe(res)
            })
        }
        if(req.query.type==='id'){
            res.attachment(`${req.query.title}.mp3`);
            ytdl(`http://www.youtube.com/watch?v=${req.query.id}`,{format:'webm',quality:'highestaudio',filter:'audioonly'})
            .on('data', data=>{}).pipe(res)
            
        }
    })
}


/**
 *  const stream await ytdl(url, {
        quality: highestaudio",
        filter: 'audioonly",
        requestOptions: {
        headers: (
        cookie: process.env.YOUTUBE_LOGIN_COOKIE,
    });
    const audioResource createAudioResource(stream, (
        inputType: StreamType.Opus,
    });
    this.player.play(audioResource);
    
    const funcao stream.listeners('error') [2];
    stream.removeListener('error', funcao);
    stream.on('error', (err) => {
    try {
    throw new Error();
    } catch {
    stream.destroy();
    console.log(err);
    }
    });
 */
