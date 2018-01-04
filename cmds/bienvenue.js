var jimp = require("jimp");

function bienvenue(message, client, prefix){
  
      if(message.content.startsWith(prefix + "bvn")){

        var mentionned = message.mentions.users.first();
        var getvalueof
        if(mentionned){
                var getvalueof = mentionned;
        } else {
                var getvalueof = message.author;
        };

        jimp.read("https://cdn.discordapp.com/avatars/"+ getvalueof.id +"/"+ getvalueof.avatar +".png").then(function(avatar){

          jimp.read('./data/welcome.png').then(function(image){

            loadedImage = image;

            jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(function(font){

              loadedImage.print(font, 350, 137, getvalueof.tag)

             avatar.resize(150, 150);

              image.composite(avatar, 60, 60);

            image.getBuffer(jimp.AUTO, (err, buffer) => {

        if (err) return console.log(err);
        
         message.channel.sendFile(buffer, 'welcome.jpg');
        
                        }); 
            })
            })
            }).catch(function(err){
            console.log('`' + err + '`')
          })

      }
    }
    module.exports = bienvenue;