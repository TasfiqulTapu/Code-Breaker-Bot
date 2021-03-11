const Discord = require("discord.js");
module.exports = {
  name:'hi',
  args:true,
  aliases:['hello','heyo'],
  description:'hello',
  execute(message,args){
    const embed = new Discord.MessageEmbed()
    .setColor("F7F7FF")
    .setTitle("hello");
    message.channel.send(embed);
  },
}