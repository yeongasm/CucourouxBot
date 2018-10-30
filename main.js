const Discord = require('discord.js');
const config = require('./config.json');
//const Bot = require('./cucouroux/cucouroux.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Cucouroux up and ready to go!');
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix)) return;
    
    if (message.author.bot) return;

    if (message.content === config.prefix + 'ping') {
        message.channel.send('pong');
    }
});

client.login(`${config.token}`);

