const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
  clientId: '533a5af89e504b7393f75c477f13c3cd',
  clientSecret: '09e925930f1547b8b95d7696272e3c32'
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
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
})
client.login(config.token)
