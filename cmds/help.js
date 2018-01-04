function help(message, client, prefix){
    
                if(message.author.bot)return;
                if(message.channel.type != "text")return;// message.channel.send("Commandes désactiver en message privé.");
                if(message.content.startsWith(prefix+"help") || (message.content === prefix+"h")) {
                            message.channel.send('Regardez vos messages privés !')
                              message.author.send({
                                      embed: {
                                          color: 0xFFFFFF
                                          , author: {
                                              name: client.user.username
                                              , icon_url: client.user.avatarURL
                                          }
                                          , fields: [{
                                                  name: "Utilitaire"
                                                  , value: "...",
                                                  "inline": true
                                              }
                                              , {
                                                  name: "Fun & Image"
                                                  , value: "`bvn`,`triggered`",
                                                  "inline": true
                                              }
                                              , {
                                                  name: "Modération"
                                                  , value: "`warn`, `seewarns`, `clearwarns`,\n `mute`, `unmute`, `kick`, `ban`",
                                                  "inline": true
                                                }
                                                , {
                                                    name: "Adminstration"
                                                  , value: "dev",
                                                  "inline": true
                                              }
                                            ]
                                          , timestamp: new Date()
                                          , footer: {
                                              icon_url: client.user.avatarURL
                                              , text: client.user.username
      
                                          }
                                      }});
                              }
                          }
    
                          module.exports = help;