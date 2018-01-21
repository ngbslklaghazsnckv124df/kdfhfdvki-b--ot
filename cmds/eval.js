const Discord = require('discord.js');

function eval(message, client, prefix) {
  
  let args = message.content.split(" ").slice(1).join(' ');

  if (message.content.startsWith(prefix + "eval")) {
  var embed = new Discord.RichEmbed()
.setTitle("Restricted")
  .setColor("#f45f42")
  .setTimestamp()
  .setThumbnail("https://media.tenor.com/images/e4034faea25e5bec4346753178205b7b/tenor.gif")
.addField("You are restricted from this command", "Its for the bot owner only!")

const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
const clean = text => {
if (typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
else
    return text;
}

  try {
       var authors = ["286228275766755328"];
  if(!authors.includes(message.author.id)) {
  message.channel.send({embed: embed});
  return;
  }
  if (args.length < 1){ 
    return message.reply("Put what args you want")
}
      const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
      var embed2 = new Discord.RichEmbed()
      .setTitle("Evaled:")
      .setColor(randomColor)
      .setTimestamp()
      .addField("Evaled: :inbox_tray:",  `\`\`\`js\n${code}\n\`\`\``)
      .addField("Output: :outbox_tray:", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
      message.channel.send({embed : embed2 });
  } catch (err) {
      const code = args.join(" ");
    var embed3 = new Discord.RichEmbed()
    .setTitle("ERROR:")
    .setColor("#f44242")
    .setTimestamp()
    .addField("Evaled: :inbox_tray:", `\`\`\`js\n${code}\n\`\`\``)
    .addField("Output: :outbox_tray:", `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    message.channel.send({embed: embed3 });
  }
  }
}

module.exports = eval;
