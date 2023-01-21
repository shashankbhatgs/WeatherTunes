const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/refresh', (req, res)=>{
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000', 
        clientId: '4ff2a996a29742c8973558f714a8b932', 
        clientSecret: '9df3c3844d8940b59dfaf81825a1d40a', 
        refreshToken,
    });

    spotifyApi
        .refreshAccessToken()
        .then(data => {
            res.json({
                accessToken: data.body.access_token, 
                expiresIn: data.body.expires_in, 
            })
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(400); 
        })
})


app.post('/login', (req, res)=>{
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000', 
        clientId: '4ff2a996a29742c8973558f714a8b932', 
        clientSecret: '9df3c3844d8940b59dfaf81825a1d40a'
    });
    spotifyApi.authorizationCodeGrant(code).then(data =>{
        res.json({
            accessToken: data.body.access_token, 
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(400); 
    })
})


app.listen(3001); 
