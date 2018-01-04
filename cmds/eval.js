function eval(message, client, prefix) {

  if (message.content.startsWith(prefix + "eval")) {
    var util = require("util");
    let args = message.content.split(" ").slice(1);   
    let code = args.join(' ');
      if (message.author.id != '286228275766755328') return;  
        try {
      let ev = eval(code)
                    let str = util.inspect(ev, {
                        depth: 1
                    })
                     str = `${str.replace(new RegExp(`${client.token}|${token}`, "g"), "nop?")}`;
                    if(str.length > 1800) {
                        str = str.substr(0, 1800)
                        str = str + "..."
                    }
                    message.delete(); 
    message.react("✅");
        message.channel.send("", { embed: { 
          color: 16758725,      
      fields: [{        
        name: ':inbox_tray: **Input**',     
          value: '\`\`\`' + code + '\`\`\`'         
    },{     
          name: ':outbox_tray: **Output**', 
              value: '\`\`\`' + str + '\`\`\`'  
            }], 
          footer: {     
        text: `request by @${message.author.username}`    }     }});} catch (err) {   message.react("❌");
    message.channel.send("", { embed: { 
          color: 16758725,      
      fields: [{        
        name: ':inbox_tray: **Input**',     
          value: '\`\`\`' + code + '\`\`\`'         
    },{     
          name: ':outbox_tray: **Output**', 
              value: '\`\`\`' + err + '\`\`\`'  
            }], 
          footer: {     
        text: `request by @${message.author.username}`    }     }});    } }}

module.exports = eval;