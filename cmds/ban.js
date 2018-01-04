function ban(message, client, prefix) {

    if(message.channel.type != "text")return;
    
        if (message.content.startsWith(prefix+'ban')) {
            const args = message.content.split(" ").slice(1);
    
        if (!message.member.hasPermission("BAN_MEMBERS") && message.author.id != config.OwnerID ) return message.channel.send(`__**Accès refusé**__\nTu n'as pas la permission pour bannir.`);
    
        if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas les permissions nécessaire (Bannir).").catch(console.error)
          };
    
        let member = message.mentions.members.first();
        if(!member)
        return message.reply("Merci de mentionner un utilisateur valide.");
    
    
        if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous ban.");
        if(member.id === client.user.id) return message.channel.send("Vous voulez me bannir ? :(.");
        if(member.highestRole.position >= message.member.highestRole.position) return message.channel.send("Vous ne pouvez pas bannir une personnes plus haut grader que vous.");
        if(!member)
          return message.reply("Merci de mentionner un utilisateur valide.");
        if(!member.bannable)
          return message.reply("Je ne peut pas bannir cette personnes! Est-t-il(elle) plus haut grader ? Ai-je les permissions de bannir cette personnes?");
    
        let reason = args.slice(1).join(' ');
        if(!reason)
          return message.reply("Merci d'indiquer la raison du ban!");
    
        member.ban(reason)
          .catch(error => message.reply(`${message.author}, Je n'ai pu bannier cette personnes à cause de : ${error}`));
        message.reply(`${member.user.tag} a été banni par ${message.author.tag} pour: ${reason}`);
    
        message.channel.send({
            embed: {
                color: 0xFFFFFF
                , author: {
                    name: member.user.username
                    , icon_url: member.user.avatarURL
                }
                , title: "Ban"
                , description: `${member.user.tag} a été Banni par ${message.author.tag}.\n**Raison:** ${reason}`
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
module.exports = ban;