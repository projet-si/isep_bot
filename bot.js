const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var translate = require('@google-cloud/translate')({
  key: 'AIzaSyBucJTOD6wdUDcE0gTuYEb2fNzzDmwWzBg'})


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Laisse moi tranquille!')}

 

if (msg.content.startsWith('!translate ')) { 
	translate.translate(msg.content.substring(11),'es', function(err, translation) {       
		if (err) {         
			console.log('Something went wrong!', err)       
		} else {         
			msg.channel.sendMessage(translation)
		}     
	})   
}

if (msg.content.startsWith('!!translate ')) { 
	var langue = msg.content.substring(12,14)
	translate.translate(msg.content.substring(14),langue, function(err, translation) {       
		if (err) {         
			console.log('Something went wrong!', err)
			msg.channel.sendMessage('peut-etre que la langue existe pas, essayez "!help" ')  
		} else {         
			msg.channel.sendMessage(translation)
		}     
	})   
}


if (msg.content.startsWith('!help ')) {
	translate.getLanguages(function(err, languages) {
  if (err) {         
			console.log('Something went wrong!', err)       
		} else { 
			for (var i = 0; i < languages.length; i++) {
			        	msg.channel.sendMessage(languages[i].code + ' ' + languages[i].name)
			        }        
			
		}    
	})
}

})

client.login(config.token)




