require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
var tts = require('./voice-rss-tts/index.js');
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views')

let joke;

async function fetchJokes() {
    const jokeUrl = `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`; 
    const dataJoke = await axios.get(jokeUrl);
    const fromData = await dataJoke.data; 
    joke = fromData.setup ? `${fromData.setup} ... ${fromData.delivery}` : fromData.joke; 
}


app.post('/post', async (req, res)=> {
    await fetchJokes();
    res.redirect('/name')
})


app.get('/name', (request, resp)=>{
    
    tts.speech({
        key: process.env.API_KEY,
        hl: 'en-us',
        v: 'Linda',
        src: joke,
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
        b64: false,
        callback: function (error, content) {
            resp.end(error || content);   }
              });
})

app.get('/', (req, res)=> {
    res.render('index.ejs'); 
})

app.listen(process.env.PORT || 2000, ()=>{
    console.log('server started');})