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

// client.on('ready', () => {
//     console.log('Cucouroux up and ready to go!');
// });

// client.on('message', message => {
//     if (!message.content.startsWith(prefix)) return;

//     if (message.author.bot) return;

//     let context = message.content.split(prefix)[1];

//     let request = require('request');

//     request.post(config.wikiURL + context, (err, response, data) => {
//         if (err) {
//             throw err;
//         }

//         fs.appendFile('./components/character.xml', data, err => {
//             if (err) {
//                 throw err;
//             }
//         });
//     });
    // message.channel.send(`Keyword: ${context}`);
    // wiki.getArticle(context, (err, data) => {
    //     if (err) {
    //         throw err;
    //     }

    //     fs.appendFile('./components/character.json', data, err => {if (err) throw err;});
    // });
// });

// client.login(config.token);