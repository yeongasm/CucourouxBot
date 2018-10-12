const Discord = require('discord.js');
const config = require('./config.json');
const Bot = require('./cucouroux/cucouroux.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Cucouroux up and ready to go!');
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix)) return;

    if (message.author.bot) return;

    let cucouroux = new Bot('./logs/');
    cucouroux.Listen(message.content);
    // let msg = "";
    // // Should there be a feature to allow concatenation of certain filters?
    // if (!subfilter.length) {
    //      msg = ResponseMessage(res_file[0]);
    // } else if (subfilter === 'skill') {
    //     // Display only skill portion of the character information.
    // } else if (subfilter === 'ability') {
    //     // Display only ability portion of the character information.
    // } else if (subfilter === 'notes') {
    //     // Display only gameplay notes portion of the character information.
    // } else {
    //     Log("No such filter parameter exist!")
    //     msg = "ごめんなさい! No such filter parameters exist :(";
    // }

    return message.channel.send(cucouroux.Reply());
    //console.log(res_arr);

    //let resobj = JSON.parse(fs.readFileSync('./dump_data/characters/' + filename, 'utf8'));
    //console.log(resobj);
    //return message.channel.send('php',`char: ${obj}\nver: ${ver}`);
});

client.login(config.token);

