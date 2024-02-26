module.exports= async function Dl_Music(req,res){
    const YoutubeMusicApi = require('youtube-music-api')
    const api = new YoutubeMusicApi()
    const ytdl = require('ytdl-core');
    const COOKIE = 'APC=AfxxVi611UfnmKEHvbY5x42SsydvpR-JgjS1rIZ7kGzwuxZNCPcg9Q; IDE=AHWqTUnjiZArEK_BJyEByBtQ5cX_MIDhnFjiZBSQW_3VMXEeEk5hUWOS_ON8L9lj2Zs';
    const OPTIONS = {
        format:'webm',
        quality:'highestaudio',
        headers: {
            cookie: COOKIE,
          },
    }
    api.initalize().then(async info => {
        if(req.query.type==='name'){
            api.search(`${req.query.title} official music & lyric`,'video').then(async result => {
                const videoID = (result.content.filter(v=>v.type==='video'))[0].videoId
                //res.attachment(`${req.query.title}.mp3`);
                res.header("Content-Disposition", `attachment;type="audio/mp3" filename="${req.query.title}.mp3`);
                const stream = await ytdl(`http://www.youtube.com/watch?v=${videoID}`,OPTIONS)

                
                stream.on('data',data=>{}).pipe(res)
            })
        }
        if(req.query.type==='id'){
            //res.attachment(`${req.query.title}.mp3`);
            res.header("Content-Disposition", `attachment;type="audio/mp3" filename="${req.query.title}.mp3`);
            const stream = await ytdl(`http://www.youtube.com/watch?v=${req.query.id}`,OPTIONS);
            stream.on('data', data=>{}).pipe(res);
            
        }
    })
}


/**C
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
