const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var translate = require('@google-cloud/translate')({
  key: 'AIzaSyBucJTOD6wdUDcE0gTuYEb2fNzzDmwWzBg'})
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
  clientId: '533a5af89e504b7393f75c477f13c3cd',
  clientSecret: '09e925930f1547b8b95d7696272e3c32'
})
var YouTube = require('youtube-node')
var youtube = new YouTube()
youtube.setKey('AIzaSyA961WArdG_rzAFtRqEaWsE98ZiM4Sa7Lw')
var weather = require('Openweather-Node')
weather.setCulture('fr')
weather.setAPPID('6ab094674da884c7449b419d3cd8f77d')
spotifyApi.clientCredentialsGrant()
var Twit = require('twit')
var Twitter = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret
})
var PokeApi = require('pokeapi')
var api = PokeApi.v1()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})
client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Laisse moi tranquille!')
  }

  if (msg.content.startsWith('!translate ')) {
    translate.translate(msg.content.substring(11), 'es', function (err, translation) {
      if (err) {
        console.log('Something went wrong!', err)
      } else {
        msg.channel.sendMessage(translation)
      }
    })
  }

  if (msg.content.startsWith('!!translate ')) {
    var langue = msg.content.substring(12, 14)
    translate.translate(msg.content.substring(14), langue, function (err, translation) {
      if (err) {
        console.log('Something went wrong!', err)
        msg.channel.sendMessage('peut-etre que la langue existe pas, essayez "!help" ')
      } else {
        msg.channel.sendMessage(translation)
      }
    })
  }

  if (msg.content.startsWith('!help ')) {
    translate.getLanguages(function (err, languages) {
      if (err) {
        console.log('Something went wrong!', err)
      } else {
        for (var i = 0; i < languages.length; i++) {
          msg.channel.sendMessage(languages[i].code + ' ' + languages[i].name)
        }
      }
    })
  }

  if (msg.content.startsWith('!spotify ')) {
    spotifyApi.clientCredentialsGrant()
        .then(function (data) {
          spotifyApi.setAccessToken(data.body['access_token'])
          if (msg.content.match('!spotify track ')) {
            var song = msg.content.substring(msg.content.lastIndexOf('!spotify track ') + '!spotify track '.length, msg.content.length)
            spotifyApi.searchTracks(song)
            .then(function (data) {
              for (var title = 0; title < 3; title++) {
                msg.channel.sendMessage('Voici un des résultats le plus probants avec votre recherche ' + data.body.tracks.items[title].external_urls.spotify)
              }
            })
          } else if (msg.content.match('!spotify artist ')) {
            var artist = msg.content.substring(msg.content.lastIndexOf('!spotify artist ') + '!spotify artist '.length, msg.content.length)
            spotifyApi.searchArtists(artist)
            .then(function (data) {
              for (var nameart = 0; nameart < 3; nameart++) {
                msg.channel.sendMessage('Voici un des résultats le plus probants avec votre recherche ' + data.body.artists.items[nameart].external_urls.spotify)
              }
            })
          } else if (msg.content.match('!spotify album ')) {
            var album = msg.content.substring(msg.content.lastIndexOf('!spotify album ') + '!spotify album '.length, msg.content.length)
            spotifyApi.searchAlbums(album)
            .then(function (data) {
              for (var namealb = 0; namealb < 3; namealb++) {
                msg.channel.sendMessage('Voici un des résultats le plus probants avec votre recherche ' + data.body.albums.items[namealb].external_urls.spotify)
              }
            })
          }
        })
  }
  if (msg.content.startsWith('!youtube-user ')) {
    var username = msg.content.substring(14)
    youtube.search(username, 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        msg.channel.send('Lien de la page de l\'utilisateur "' + username + '" : https://www.youtube.com/user/' + username)
      }
    })
  } else if (msg.content.startsWith('!youtube-videos ')) {
    youtube.addParam('type', 'video')
    youtube.search(msg.content.substring(16), 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        for (var i = 1; i <= 3; i++) {
          msg.channel.send('Lien n∞' + (i) + ' : https://www.youtube.com/watch?v=' + result.items[i - 1].id.videoId)
        }
      }
    })
  } else if (msg.content.startsWith('!youtube-playlist ')) {
    youtube.addParam('type', 'playlist')
    youtube.search(msg.content.substring(18), 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        for (var i = 1; i <= 3; i++) {
          msg.channel.send('Lien n∞' + (i) + ' : https://www.youtube.com/playlist?list=' + result.items[i - 1].id.playlistId)
        }
      }
    })
  } else if (msg.content.startsWith('!youtube ')) {
    var searchContent = msg.content.substring(9)
    console.log(searchContent)
    if (searchContent === ' ') {
      msg.channel.send('You must enter some text')
    } else if (searchContent === '!youtube') {
      msg.channel.send('You must enter somtehing else than "!youtube"')
    } else {
      youtube.search(searchContent, 3, function (error, result) {
        if (error) {
          console.log(error)
        } else {
          var stockitemty = result.items
          for (var i = 1; i <= 3; i++) {
            switch (stockitemty[i - 1].id.kind) {
              case 'youtube#channel':
                msg.channel.send('Lien n∞' + (i) + ' : https://www.youtube.com/channel/' + stockitemty[i - 1].id.channelId)
                break
              case 'youtube#video':
                msg.channel.send('Lien n∞' + (i) + ' : https://www.youtube.com/watch?v=' + stockitemty[i - 1].id.videoId)
                break
              case 'youtube#playlist':
                msg.channel.send('Lien n∞' + (i) + ' : https://www.youtube.com/playlist?list=' + stockitemty[i - 1].id.playlistId)
                break
            }
          }
        }
      })
    }
  }
  if (msg.content.startsWith('!openweather ')) {
    weather.now(msg.content.substring(13), function (error, aData) {
      if (error) {
        console.log(error)
      } else {
        var deg = aData.values.main.temp - 273.15
        var degmin = aData.values.main.temp_min - 273.15
        var degmax = aData.values.main.temp_max - 273.15
        var kph = aData.values.wind.speed * 1.61
        msg.channel.sendMessage('La température actuelle est de ' + deg + '°C')
        msg.channel.sendMessage('Nous avons une humidité environ égale à ' + aData.values.main.humidity + '%')
        msg.channel.sendMessage('Le vent souffle à ' + kph + ' km/h')
        msg.channel.sendMessage('La température maximale atteindra ' + degmax + '°C tandis que la température minimale sera de ' + degmin + '°C')
        msg.channel.sendMessage('Autrement dit, on pourrait traduire les informations précédentes par ' + aData.values.weather[0].description)
      }
    })
  }
  if (msg.content.startsWith('!forecast ')) {
    weather.forecast(msg.content.substring(10), function (error, aData) {
      if (error) {
        console.log(error)
      } else {
        var deg1 = aData.values.list[0].main.temp - 273.15
        var deg2 = aData.values.list[1].main.temp - 273.15
        var deg3 = aData.values.list[2].main.temp - 273.15
        var deg4 = aData.values.list[3].main.temp - 273.15
        var deg5 = aData.values.list[4].main.temp - 273.15
        msg.channel.sendMessage('Vous avez demandé une prévision de 5 jours ? La voici, la température aujourd hui, soit le jour 1 est de ' + deg1 + '°C')
        msg.channel.sendMessage('Autrement dit, il fera : ' + aData.values.list[0].weather[0].description)
        msg.channel.sendMessage('La température pour le jour 2 est de ' + deg2 + '°C')
        msg.channel.sendMessage('Autrement dit, il fera : ' + aData.values.list[1].weather[0].description)
        msg.channel.sendMessage('La température pour le jour 3 est de ' + deg3 + '°C')
        msg.channel.sendMessage('Autrement dit, il fera : ' + aData.values.list[2].weather[0].description)
        msg.channel.sendMessage('La température pour le jour 4 est de ' + deg4 + '°C')
        msg.channel.sendMessage('Autrement dit, il fera : ' + aData.values.list[3].weather[0].description)
        msg.channel.sendMessage('La température pour le jour 5 est de ' + deg5 + '°C')
        msg.channel.sendMessage('Autrement dit, il fera : ' + aData.values.list[4].weather[0].description)
      }
    })
  }
  if (msg.content.startsWith('!twitter ')) {
    var tweetContent = msg.content.substring(9, 15)
    if (tweetContent === 'search') {
      /** SEARCH TWEET WHICH MENTIONS Baby_Groot_ISEP ACCOUNT **/
      Twitter.get('search/tweets', {q: 'Baby_Groot_ISEP'}, function webhook (error, data, response) {
        if (error) throw error
        var tweets = data.statuses
        for (var i = 0; i < tweets.length; i++) {
          msg.channel.send('"' + tweets[i].text + '" by @' + tweets[i].user.screen_name)
        }
      })
    } else {
      /** POST TWEET **/
      tweetContent = msg.content.substring(9)
      if (tweetContent.length > 140) {
        msg.channel.send('Your tweet is too long !')
      } else {
        var tweet = {status: tweetContent}
        Twitter.post('statuses/update', tweet, tweeted)
      }
    }
  }
  function tweeted (err, data, response) {
    if (err) {
      msg.channel.send('Something went wrong!', err)
    } else {
      msg.channel.send('Your tweet has been tweeted successfully!')
    }
  }
  if (msg.content.startsWith('!pokemon ')) {
    var pokemonChosen = msg.content.substring(9)
    var newPokemon
    if (pokemonChosen === 'evolve') {
      var currentPokemon = client.username
      api.get({ resource_uri: '/api/v1/pokemon/' + currentPokemon + '/' }).then(function (pokemon) {
        newPokemon = pokemon.evolutions[0].to
      })
      console.log('evolution : ' + newPokemon)
      if (newPokemon !== undefined) {
        api.get({ resource_uri: '/api/v1/pokemon/' + newPokemon + '/' }).then(function (pokemon) {
          msg.channel.send('Hello, now I am ' + pokemon.name + ' and I am pokemon number ' + pokemon.national_id + '. I am a ' + pokemon.types[0].name + ' pokemon. I am ' + pokemon.height + ' feet tall and I weight ' + pokemon.weight + ' pounds!')
          changePokemon(newPokemon, pokemon.national_id)
        })
      } else {
        msg.channel.send('This pokemon can not evolve!')
      }
    } else {
      api.get({ resource_uri: '/api/v1/pokemon/' + pokemonChosen + '/' }).then(function (pokemon) {
        msg.channel.send('Hello, my name is ' + pokemon.name + ' and I am pokemon number ' + pokemon.national_id + '. I am a ' + pokemon.types[0].name + ' pokemon. I am ' + pokemon.height + ' feet tall and I weight ' + pokemon.weight + ' pounds!')
        changePokemon(pokemonChosen, pokemon.national_id)
      })
    }
  }
  function changePokemon (name, imageId) {
    client.user.setUsername(name)
    client.user.setAvatar('./pokemon/' + imageId + '.png')
  }
})

client.login(config.token)
