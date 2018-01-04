function mute(message, client, prefix){

    if(message.content.startsWith(prefix + "mute")){
        if(message.author.bot)return;
if (!message.member.hasPermission("MANAGE_MESSAGES") ) return message.channel.send("Tu n'as pas les permissions pour Mute.");
let membermention = message.mentions.members.first();

if(!message.mentions.members.first()) return message.reply("Veillez mentionner l'utlisateur à Mute.")
if(membermention.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous mute.");
if(membermention.highestRole.position >= message.member.highestRole.position) return message.channel.send("Vous ne pouvez pas mute une personnes plus haut grader que vous, ou du même grade.");
if(membermention.id === message.guild.owner.user.id) return message.channel.send("Vous ne pouvez pas mute l'owner du serveur.");

let MutedRole = message.guild.roles.find("name", "Muted");

if(!message.guild.roles.exists("name", "Muted")) {
    try{
        message.guild.createRole({
            name:'Muted',

            permissions: []
        }).then((role) => {
            MutedRole = role;
            message.guild.channels.findAll('type','text').map(c =>{
                c.overwritePermissions(role,{'SEND_MESSAGES': false, 'ADD_REACTIONS': false, 'CHANGE_NICKNAME': false, 'CREATE_INSTANT_INVITE': false});
            });
            message.guild.channels.findAll('type','voice').map(c =>{
                c.overwritePermissions(role,{'SPEAK': false});
            });
        })
    }catch(e){
        message.channel.send(`J'ai pas assez de permissions.\n${e}`)
    }
    return message.channel.send("Role `Muted` inexistant! Je viens d'en créer un.\nRessayer dans quelque instant.");
}

if(membermention.roles.has(MutedRole)) return message.channel.send("L'utilisateur est déjà Mute!");
membermention.addRole(MutedRole);

membermention.send("Tu as été unmute dans **" + message.guild.name+ "** par " + message.author.username + ".")
message.channel.send({
    embed: {
        color: 0xFFFFFF
        , author: {
            name: membermention.user.username
            , icon_url: membermention.user.avatarURL
        }
        , title: "Mute"
        , description: `${membermention.user.tag} a été Mute par ${message.author.tag}.`
        , fields: [{
                name: `Info User`
                , value: `Name : ${membermention.user.tag}\nID : ${membermention.id}`
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

module.exports = mute;