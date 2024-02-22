module.exports.send_token = function Send_Token(req,res){
    const request = require('request');
    const fs = require('node:fs/promises')
    const redirect_uri ='http://localhost:4444'
    const client_id = '72ecfde4c4b94ae29fb9a950cd0697ae';
    const client_secret = '56f9a161034b49a2a7bbc4ff2fcdb13b'
    
    const code = req.query.code || null;
    console.log
    const state = req.query.state || null;

    const authOptions ={
        url:'https://accounts.spotify.com/api/token',
        form: {
            code:code,
            redirect_uri:redirect_uri,
            grant_type:'authorization_code'
        },
        headers:{
            Authorization: 'Basic '+ (new Buffer.from(client_id+":"+client_secret).toString('base64'))
        },
        json: true
    };
    request.post(authOptions,async(error,response,body)=>{
        var all = body
        var access_token = body.access_token;
        await fs.writeFile('src/token.json',JSON.stringify({token:access_token,refresh_token: body.refresh_token}),null,2,err=>{
            if(err)console.log(err)
        })
        res.send({
            'access_token': access_token,
            "ever":all
        });
    })
}
module.exports.generate_token = function Generate_Token(req,res){
    const client_id = '72ecfde4c4b94ae29fb9a950cd0697ae';
    
    const querystring=require('querystring')

    var scope = 'user-read-private user-read-email';
    var state = 'gdsg474fsk590200gblmdsl'
    res.redirect('https://accounts.spotify.com/authorize?'+ querystring.stringify({
        response_type:'code',
        client_id:client_id,
        scope: scope,
        redirect_uri:'http://localhost:4444',
        state:state
    }))
}
module.exports.refresh_token = new Promise((resolve, reject)=>{
    //const fs = require('node:fs/promises')
    const tokens = {"token":"","refresh_token":"AQBKZIzF0-X-mIHLL7JIWZnQuodJUCj_VFurrg4_UMBH5kPxEM_HB5tOVG_GWS1hlN5h15ykmpfLwrGvqusWRu9BBgyp_P-ZyxGZO0yIRfz2DJlTxjYwYGbLBgal0leBlO8"}//JSON.parse(await (await fs.readFile('src/token.json')).toString())
    const request = require('request');
    var TOKEN_RETURN = ''
    
    const client_id = '72ecfde4c4b94ae29fb9a950cd0697ae';
    const client_secret = '56f9a161034b49a2a7bbc4ff2fcdb13b'
    var refresh_token = tokens.refresh_token

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
        grant_type: 'refresh_token',    
        refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, async function(error, response, body) {
        if (!error && response.statusCode === 200) {
        var access_token = body.access_token

        tokens.token = access_token
        TOKEN_RETURN = tokens;
        console.log('------------', TOKEN_RETURN);
        resolve(TOKEN_RETURN);
    }
    });
});
