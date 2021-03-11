const Discord = require('discord.js');
module.exports = {
  name:'credits',
  aliases:['credit'],
  description:'People behind the curtain 👀',
  execute(message,args){
    const embed = new Discord.MessageEmbed;
    embed.setTitle('The Devs');
    embed.setColor('AQUA');
    embed.setDescription('Made by [TAPU#9161](https://twitter.com/TasfiqulTapu) with help from [FalseDev#4968](https://discord.gg/KgZRMch3b6)');
    embed.addField('\u200b','Made for TCA Bot Jam 2021');
    message.channel.send(embed);
  }
}