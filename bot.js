const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
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
    msg.channel.sendMessage('Hello to you too, fellow !')
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
