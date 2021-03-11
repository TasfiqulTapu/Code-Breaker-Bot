const Datastore = require("nedb");
let db = require("../data/db.js");
const Discord = require("discord.js");
module.exports = {
  name: "restart",
  args: false,
  aliases: ["r"],
  description: "Restart game from the beginning",
  execute(message, args) {
    const embed = new Discord.MessageEmbed();
    db.remove({ uid: message.author.id }, { multi: true }, function(err, numRemoved) {
      let newDoc = {
          uid:message.author.id,
          trust:15,
          state:0,
          currtask:0,
          imp:0,
        };
        db.insert(newDoc,(err,newD)=>{
          embed.setColor("BDD5EA");
          embed.setTitle('New game started!!!');
          embed.setDescription('Use `.current` for current task');
          message.channel.send(embed);
        });
    });
  }
}; 
