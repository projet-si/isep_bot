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
                msg.channel.sendMessage('Voici un des résultat le plus probants avec votre recherche ' + data.body.albums.items[namealb].external_urls.spotify)
              }
            })
          }
        })
  }
  if (msg.content.startsWith('!youtube ')) {
    youtube.search(msg.content.substring(6), 3, function (error, result) {
      youtube.addParam('type', 'video')
      if (error) {
        console.log(error)
      } else {
        youtube.addParam('type', 'video')
        var stockitemty = result.items
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/watch?v=' + stockitemty[0].id.videoId)
        msg.channel.sendMessage('Et voici le deuxième https://www.youtube.com/watch?v=' + stockitemty[1].id.videoId)
        msg.channel.sendMessage('Et enfin le dernier https://www.youtube.com/watch?v=' + stockitemty[2].id.videoId)
      }
    })
  }

  if (msg.content.startsWith('!youtube-user ')) {
    youtube.search(msg.content.substring(15), 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/user/' + result.items[0].snippet.channelTitle)
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/user/' + result.items[1].snippet.channelTitle)
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/user/' + result.items[2].snippet.channelTitle)
      }
    })
  }
  if (msg.content.startsWith('!youtube-playlist ')) {
    youtube.addParam('type', 'playlist')
    youtube.search(msg.content.substring(18), 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        youtube.addParam('type', 'playlist')
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/playlist?list=' + result.items[0].id.playlistId)
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/playlist?list=' + result.items[1].id.playlistId)
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/playlist?list=' + result.items[2].id.playlistId)
      }
    })
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
})

client.login(config.token)
