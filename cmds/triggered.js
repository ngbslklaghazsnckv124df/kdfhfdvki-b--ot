var jimp = require("jimp");

function triggered(message, client, prefix){
  
      if(message.content.startsWith(prefix + "triggered")){

var url = ""
    if (message.mentions.users.array().length > 0) {
      url = message.mentions.users.array()[0].displayAvatarURL
    } else {
      url = message.author.displayAvatarURL
    }
    if (url == null) {
      message.reply("Sorry, you need a profile picture to use this command.")
      return;
    } else if (url.search("gif") === -1) {
      jimp.read(url, function (err, avatar) {
        jimp.read('./data/triggered.png', function (err, triggered) {
          avatar.resize(150, 150);
          triggered.resize(150, jimp.AUTO);
          avatar.composite(triggered, 0, 123);
          var path = './data/trigpic.png'
          avatar.write(path, function(err) {
            message.channel.sendFile(path)
          })
        })
      });
    }
  }
}

module.exports = triggered;

