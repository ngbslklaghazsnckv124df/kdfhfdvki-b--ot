function warn(message, client, prefix){
    
  var fs = require('fs');
  let warns = JSON.parse(fs.readFileSync("./data/warns.json", "utf8"));
  if (message.content.startsWith(prefix + "warn")){
  if (message.channel.type === "dm") return;
  var mentionned = message.mentions.users.first();
  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas les permissions nécessaire. (`MANAGE_MESSAGES`)").catch(console.error);
  if(message.mentions.users.size === 0) {
    return message.channel.send("Veuillez mentionner un utilisateur.");
  }else{
      const args = message.content.split(' ').slice(1);
      const mentioned = message.mentions.users.first();
      if (message.member.hasPermission('MANAGE_MESSAGES')){
        if (message.mentions.users.size != 0) {
          if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
            if (args.slice(1).length != 0) {
              const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} à ${new Date().getHours()}:${new Date().getMinutes()}.`;
              if (warns[message.guild.id] === undefined)

                warns[message.guild.id] = {};

              if (warns[message.guild.id][mentioned.id] === undefined)
              
                warns[message.guild.id][mentioned.id] = {};
              const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

              if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

                warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
              } else {
                warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
                  time: date,
                  user: message.author.id};
              }
              fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
  message.delete();
              message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
  message.mentions.users.first().send(`:warning: **Warn |** Tu as été warn dans **${message.guild.name}** par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
            } else {
              message.channel.send("Usage incorect, usage correcte : **"+prefix+"warn <@user> <raison>**");
            }
          } else {
            message.channel.send("Usage incorect, usage correcte : **"+prefix+"warn <@user> <raison>**");
          }
        } else {
          message.channel.send("Usage incorect, usage correcte : **"+prefix+"warn <@user> <raison>**");
        }
      } else {
        message.channel.send("Tu n'as pas les permissions nécessaire. (`MANAGE_MESSAGES`)");
      }
    }
  }
  
    if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
  if (message.channel.type === "dm") return;

  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas les permissions nécessaire. (`MANAGE_MESSAGES`)").catch(console.error);
  
      const mentioned = message.mentions.users.first();

      const args = message.content.split(' ').slice(1);

      if (message.member.hasPermission('MANAGE_MESSAGES')){

        if (message.mentions.users.size !== 0) {
          if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
            try {
              if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
               
                message.channel.send("**"+mentioned.tag+"** n'a aucun avertissement.");
                return;
              }
            } catch (err) {
              message.channel.send("**"+mentioned.tag+"** n'a aucun avertissement");
              return;
            }

            let arr = [];
            arr.push(`**${mentioned.tag}**, \`Nombre(s) de warns: **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns.`\n");
            
            for (var warn in warns[message.guild.id][mentioned.id]) {

              var timeWarn = warns[message.guild.id][mentioned.id][warn].time;

                arr.push(`\`Numéro warn : "${warn}"\` | **Raison : "`+warns[message.guild.id][mentioned.id][warn].raison+" \" Averti par "+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"\n**`Le "+timeWarn+"`");
            }
            message.channel.send(arr.join('\n'));
          } else {
            message.channel.send("Usage incorect, usage correcte : **"+prefix+"seewarns <@user>**");
            console.log(args);
          }
        } else {
          message.channel.send("Usage incorect, usage correcte : **"+prefix+"seewarns <@user>**");
        }
      } else {
        message.channel.send("Usage incorect, usage correcte : **"+prefix+"seewarns <@user>**");
      }
    }
  
  
    if (message.content.startsWith(prefix+"clearwarns")||message.content===prefix+"clearwarns") {
  if (message.channel.type === "dm") return;
  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas les permissions nécessaire. (`MANAGE_MESSAGES`)").catch(console.error);
     
  const mentioned = message.mentions.users.first();

  const args = message.content.split(' ').slice(1);

  const arg2 = Number(args[1]);

  if (message.member.hasPermission('MANAGE_MESSAGES')){

        if (message.mentions.users.size != 0) {
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){

            if (!isNaN(arg2)) {
              if (warns[message.guild.id][mentioned.id] === undefined) {

                message.channel.send(mentioned.tag+" n'a aucun avertissement.");
                return;

              } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
                message.channel.send("Numéro de warn inccorect ou inexistant.");
                return;
              }
              delete warns[message.guild.id][mentioned.id][arg2];
              var i = 1;
              Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
                
                var val=warns[message.guild.id][mentioned.id][key];
                
                delete warns[message.guild.id][mentioned.id][key];
                
                key = i;
                
                warns[message.guild.id][mentioned.id][key]=val;
                
                i++;
              });
              fs.writeFile("./data/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
              if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
                delete warns[message.guild.id][mentioned.id];
              }
              message.channel.send(`Avertissement de **${mentioned.tag}**\': **${args[1]}** a été delete avec succès!`);
              return;
            } if (args[1] === "all") {
              
                delete warns[message.guild.id][mentioned.id];
              
              fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
              
              message.channel.send(`Tout les avertissement de **${mentioned.tag}** a été delete avec succès!`);
              return;
            } else {
              message.channel.send("Usage incorect, usage correcte : **"+prefix+"clearwarns <utilisateur> <nombre>**");
            }
          } else {
            message.channel.send("Usage incorect, usage correcte : **"+prefix+"clearwarns <utilisateur> <nombre>**");
          }
        } else {
         message.channel.send("Usage incorect, usage correcte : **"+prefix+"clearwarns <utilisateur> <nombre>**");
        }
      } else {
        message.channel.send("Tu n'as pas les permissions nécessaire. (`MANAGE_MESSAGES`)");
      }
    }
  }


      module.exports = warn;