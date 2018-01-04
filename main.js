const Discord = require("discord.js");
var jimp = require("jimp");
const client = new Discord.Client();
const config = require('./config.json');
  

const music = require("./cmds/music.js").run(client);
const leavejoin = require("./cmds/event.js").run(client);


var prefix = config.prefix;

  client.on('ready', () => {
  console.log("Bot Faelwen \nON");
client.user.setGame(`${prefix}help | Ban & Kick in dev.`, "https://twitch.tv/flayrox")
  });


  client.on('message', message => {

    const help = require('./cmds/help.js');
    help(message, client, prefix);

    const warn = require('./cmds/warn.js');
    warn(message, client, prefix);
    
    const mute = require('./cmds/mute.js');
    mute(message, client, prefix);

    const unmute = require('./cmds/unmute.js');
    unmute(message, client, prefix);

    const ban = require('./cmds/ban.js');
    ban(message, client, prefix);

    const kick = require('./cmds/kick.js');
    kick(message, client, prefix);

    const eval = require('./cmds/eval.js');
    eval(message, client, prefix);

    const triggered = require('./cmds/triggered.js');
    triggered(message, client, prefix);

    const bienvenue = require('./cmds/bienvenue.js');
    bienvenue(message, client, prefix);

    })


client.login(config.token);