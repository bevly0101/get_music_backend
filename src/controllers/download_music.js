module.exports= async function Dl_Music(req,res){
    const YoutubeMusicApi = require('youtube-music-api')
    const api = new YoutubeMusicApi()
    const ytdl = require('ytdl-core');
    const COOKIE = 'APISID=fek7FS2fozhozOPJ/AYrb7E3TVkYdtKR96; SAPISID=COYbr0zlHV7PgNM4/AVQuXand9WSqxLd_6; __Secure-1PAPISID=COYbr0zlHV7PgNM4/AVQuXand9WSqxLd_6; __Secure-3PAPISID=COYbr0zlHV7PgNM4/AVQuXand9WSqxLd_6; SID=g.a000gQjRGHojlBDBjVQY4KNDkhl6TJbW5GSsY6hEtmX0qg16rkKM9iGZ5oGlF39t_jUhxws5fAACgYKAZkSAQASFQHGX2Mioj_1f2eJuwxzQCNVCqxOFBoVAUF8yKoVMotI0FGHNUxYrWS8xv7p0076; PREF=f6=40000000&f7=4150&tz=America.Sao_Paulo&f5=30000; SIDCC=ABTWhQHhyon0ul45j8b4uzVPTdcBu60ch6rC7W6AUm3sXv8D1rtgzTw1Myas5ZuHbk2_OXOFDkE6'
    api.initalize().then(async info => {
        if(req.query.type==='name'){
            api.search(`${req.query.title} official music & lyric`,'video').then(async result => {
                const videoID = (result.content.filter(v=>v.type==='video'))[0].videoId
                res.attachment(`${req.query.title}.mp3`);
                const stream = await ytdl(`http://www.youtube.com/watch?v=${videoID}`,{
                    format:'webm',
                    quality:'highestaudio',
                    filter:'audioonly',
                    headers: {
                        cookie: COOKIE,
                      },
                })
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
