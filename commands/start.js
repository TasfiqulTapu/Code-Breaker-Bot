const Discord = require("discord.js");
const Datastore = require('nedb');
let db = require('../data/db.js');
let task = require('./taskarray.js');
module.exports = {
  name:'start',
  args:false,
  description:'Start your game!',
  execute(message,args){
    db.findOne({ uid: message.author.id }, function (err, doc) {
  // doc is the document
  // If no document is found, doc is null 
      const embed = new Discord.MessageEmbed();
      if(doc === null){
        let newDoc = {
          uid:message.author.id,
          trust:15,
          state:0,
          currtask:0,
          imp:0,
        };
        db.insert(newDoc,(err,newD)=>{
          embed.setColor("BDD5EA");
          embed.setTitle("New game started.");
          embed.setDescription("You were hired by the government to decode enemy messages caught in the battlefield. Be loyal to them or you and your family will be perished.");
          embed.addField("\u200b","Use `.current` to see current task",false);
          embed.setFooter('Use .tutorial for a guide');
          message.channel.send(embed)
        });
      }else{
        embed.setColor("AQUA");
        embed.setTitle("Game already started");
        embed.setDescription("Use `.current` to see your current task");
        message.channel.send(embed);
       // console.log(doc);
      }
});
  },
}