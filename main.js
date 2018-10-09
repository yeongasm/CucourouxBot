const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const request = require('request')

const __logdir = "./logs/";
const filename = "log.txt";
const prefix = '~';

const client = new Discord.Client();

// Creating a log file, not sure what it will be used for yet!
fs.access(__logdir + filename, fs.constants.R_OK, err => {
    if (err) {
        console.log(`${filename} 'not found! Making one now~'`);
        fs.writeFile(__logdir + filename, '[LOGS]', (err) => {
            if (err)
                throw err;
    
            console.log('Log file successfully created');
        });    
    }
});

client.on('ready', () => {
    console.log('Cucouroux up and ready to go!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;

    if (message.author.bot) return;

    let regex = new RegExp(`(~)(\\w+)(\\s)*(\\w+)*`);

    let result = regex.exec(message.content);
    let obj = result[2];
    let ver = "";
    
    if (result[4]) {
        ver = result[4];
    }

    return message.channel.send('php',`char: ${obj}\nver: ${ver}`);
    console.log('char: '+obj+'\nvers: '+ver);

});

client.login(config.token);