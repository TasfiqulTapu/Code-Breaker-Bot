const Datastore = require("nedb");
let db = require("../data/db.js");
const Discord = require("discord.js");
let task = require("./taskarray.js");
module.exports = {
  name:"hint",
  args:false,
  aliases:["h"],
  description:"Get a hint about how to do decode the message.",
  execute(message,args){
    const embed = new Discord.MessageEmbed();
    db.findOne({uid:message.author.id},function(err,doc){
      if(doc == null){
        embed.setColor("FE5F55");
        embed.setTitle("use `.start` to use this command");
        message.channel.send(embed);
      }else{
        let i = doc.state;
        embed.setColor("F7F7FF");
        embed.setTitle(task[i][2]);
        embed.setFooter("use .s to submit");
        message.channel.send(embed);
      }
    });
  }
}