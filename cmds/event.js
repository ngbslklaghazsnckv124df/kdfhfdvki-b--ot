var jimp = require('jimp')

module.exports.run = async (client) => {

client.on('guildMemberAdd', member =>{

    const channel = client.channels.get('391552734459068416');

    channel.send(`Bienvenue **<@${member.user.id}>** sur **Faelwen**, nous te souhaitons un agréable moment sur le serveur!\nTu peut allé lire le régelement dans <#391612376543395850> ! :ok_hand:`)

    jimp.read("https://cdn.discordapp.com/avatars/"+ member.user.id +"/"+ member.user.avatar +".png").then(function(avatar){
        
                  jimp.read('./data/welcome.png').then(function(image){
        
                    loadedImage = image;
        
                    jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(function(font){
        
                      loadedImage.print(font, 350, 137, member.user.tag)
        
                     avatar.resize(150, 150);
        
                      image.composite(avatar, 60, 60);
        
                    image.getBuffer(jimp.AUTO, (err, buffer) => {
        
                if (err) return console.log(err);
                
                 channel.sendFile(buffer, 'welcome.jpg');
                
                                   }); 
                            })
                    })
                    }).catch(function(err){
                    console.log('`' + err + '`')
                })

        })

        client.on('guildMemberRemove', member =>{
            
                const channel = client.channels.get('391552734459068416');
            
                channel.send(`**${member.user.username}** Nous a quitté...`)
            
                    })
    }
