const btn = document.getElementById('btn-joke')
const audioElement = document.getElementById('audio')

// toggle button's disable status
const toggleBtn = function() {
    btn.disabled = !btn.disabled
}

// Getting Jokes from API
const getJokes = async function() {
    btn.disabled = true
    // API - sv443 - https://sv443.net/jokeapi/v2/
    const url = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    let joke = ''
    
    try{
        const request = await fetch(url)
        const data = await request.json()
        
        // checking to see if the joke is one or two part
        if(data.type === 'twopart') {
            joke = `${data.setup} ... ${data.delivery}`
         } else if(data.type === 'single') {
             joke = data.joke
         }
        
        // calling tellMe fn on audio element        
        audioElement.play(tellMe(joke))
        
    } catch(error) {
        console.log(error)
    }
}

// setting the language, source, key, etc. by using speech fn of VoiceRSS SDK
const tellMe = function(joke) {
    VoiceRSS.speech({
        key: 'ca6d909013be4762b3e44bea47f7aeab',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Event Listeners
btn.addEventListener('click', getJokes)

// executes when audio ends
audioElement.addEventListener('ended', toggleBtn)