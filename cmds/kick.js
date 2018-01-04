function kick(message, client, prefix){

    if (message.content.startsWith(prefix + "kick")){
        
                const args = message.content.split(" ").slice(1);
                if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`__**Accès refusé**__\nTu n'as pas la permission pour kick.`);
        
                if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
                    return message.channel.send("Je n'ai pas les permissions nécessaire (Kick).").catch(console.error)
                  };
                
                    let member = message.mentions.members.first();
                    if(!member)
                      return message.reply("Merci de mentionner un utilisateur valide.");
        
                      if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous kick.");
                      if(member.id === client.user.id) return message.channel.send("Vous voulez me kick ? :(.");
                      if(member.highestRole.position >= message.member.highestRole.position) return message.channel.send("Vous ne pouvez pas kick une personnes plus haut grader que vous.");
        
                    if(!member.kickable)
                    return message.reply("Je ne peut pas kick cette personnes! Est-t-il(elle) plus haut grader ? Ai-je les permissions de kick cette personnes?");
                
                    let reason = args.slice(1).join(' ');
                    if(!reason)
                    return message.reply("Merci d'indiquer la raison du kick!");
                  
                
                    member.kick(reason)
                      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
                      message.reply(`${member.user.tag} a été kick par ${message.author.tag} pour: ${reason}`);
        
                    message.channel.send({
                        embed: {
                            color: 0xFFFFFF
                            , author: {
                                name: member.user.username
                                , icon_url: member.user.avatarURL
                            }
                            , title: "Kick"
                            , description: `${member.user.tag} a été Kick par ${message.author.tag}.\n**Raison:** ${reason}`
                            , fields: [{
                                    name: `Info User`
                                    , value: `Name : ${member.user.tag}\nID : ${member.id}`
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

module.exports = kick;