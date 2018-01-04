function unmute(message, client, prefix) {

if(message.content.startsWith(prefix + "unmute")){
    if(message.channel.type != "text")return;
    if(message.author.bot)return;
        

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les permissions pour UnMute.");
let member = message.mentions.members.first();
if (!member) return message.reply("Merci de mentionner l'user a unmute!")
const muted = message.guild.roles.find('name', 'Muted');
if(!muted || !member.roles.has(muted.id)) return message.channel.send("L'utilisateur n'est pas mute!");
member.removeRole(muted.id)
message.channel.send("L'utilisateur a été UnMute!")
member.send(`Tu as été UnMute du serveur ***${message.guild.name}*** par ${message.author.name}`)
  }

}

module.exports = unmute;