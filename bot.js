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
    spotifyApi.searchTracks(msg.content.substring(9))
.then(function (data) {
  msg.channel.sendMessage('Voici le premier résultat le plus probant avec votre recherche ' + data.body.tracks.items[0].external_urls.spotify)
  msg.channel.sendMessage('Voici le deuxième résultat le plus probant avec votre recherche ' + data.body.tracks.items[1].external_urls.spotify)
  msg.channel.sendMessage('Voici le troisème résultat le plus probant avec votre recherche ' + data.body.tracks.items[2].external_urls.spotify)
}, function (err) {
  console.log('Something went wrong!', err)
})
  }
  if (msg.content.startsWith('!spotify track ')) {
    spotifyApi.searchTracks('track:' + msg.content.substring(16))
.then(function (data) {
  msg.channel.sendMessage('Voici le premier résultat le plus probant avec votre recherche ' + data.body.tracks.items[0].external_urls.spotify)
  msg.channel.sendMessage('Voici le deuxième résultat le plus probant avec votre recherche ' + data.body.tracks.items[1].external_urls.spotify)
  msg.channel.sendMessage('Voici le troisème résultat le plus probant avec votre recherche ' + data.body.tracks.items[2].external_urls.spotify)
}, function (err) {
  console.log('Something went wrong!', err)
})
  }

  if (msg.content.startsWith('!spotify artiste ')) {
    spotifyApi.searchTracks('artist:' + msg.content.substring(17))
.then(function (data) {
  msg.channel.sendMessage('Voici le premier résultat le plus probant avec votre recherche ' + data.body.tracks.items[0].external_urls.spotify)
  msg.channel.sendMessage('Voici le deuxième résultat le plus probant avec votre recherche ' + data.body.tracks.items[1].external_urls.spotify)
  msg.channel.sendMessage('Voici le troisème résultat le plus probant avec votre recherche ' + data.body.tracks.items[2].external_urls.spotify)
}, function (err) {
  console.log('Something went wrong!', err)
})
  }

  if (msg.content.startsWith('!spotify album ')) {
    spotifyApi.searchTracks('album:' + msg.content.substring(16))
.then(function (data) {
  msg.channel.sendMessage('Voici le premier résultat le plus probant avec votre recherche ' + data.body.tracks.items[0].external_urls.spotify)
  msg.channel.sendMessage('Voici le deuxième résultat le plus probant avec votre recherche ' + data.body.tracks.items[1].external_urls.spotify)
  msg.channel.sendMessage('Voici le troisème résultat le plus probant avec votre recherche ' + data.body.tracks.items[2].external_urls.spotify)
}, function (err) {
  console.log('Something went wrong!', err)
})
  }
  if (msg.content.startsWith('!youtube ')) {
    youtube.search(msg.content.substring(6), 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
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
    youtube.search(msg.content.substring(18), 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        msg.channel.sendMessage('Voilà le premier lien en rapport avec votre recherche https://www.youtube.com/playlist?list=' + result.items[0].id.playlistId)
      }
    })
  }
})
client.login(config.token)
