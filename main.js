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

    let input_regex = new RegExp(`(~)(\\w+)(\\s)*(\\w+)*`);

    let result = input_regex.exec(message.content);
    let obj = result[2];
    let ver = "";
    
    if (result[4]) {
        ver = result[4];
    }

    let filter_regex = (!ver.length) ? `(${obj}[A-Za-z\\s'.]*)(.json)` : `(${obj}[A-Za-z\\s']*)(\\(${ver}\\)){0,1}(.json)`;
    let files;
    files = fs.readdirSync('./dump_data/characters/');
    console.log(ver);
    let parser = new RegExp(filter_regex, 'i');
    let res_file = parser.exec(files.toString());

    if (!res_file) {
        return message.channel.send('ごめんなさい! Cucouroux wasn\'t able to find for it :(');
    }

    let msg = ResponseMessage(res_file[0]);
    return message.channel.send(msg, {code: true});
    //console.log(res_arr);

    //let resobj = JSON.parse(fs.readFileSync('./dump_data/characters/' + filename, 'utf8'));
    //console.log(resobj);
    //return message.channel.send('php',`char: ${obj}\nver: ${ver}`);
});

client.login(config.token);

function ResponseMessage(character_file) {
    let obj = JSON.parse(fs.readFileSync(`dump_data/characters/${character_file}`, 'utf8'));
    
    return `
    Name    : ${obj.name}   Gender: ${obj.gender}
    Element : ${obj.element}`;
}