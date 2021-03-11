const Discord = require('discord.js');
module.exports = {
  name:'tutorial',
  aliases:['tut','how'],
  description:'A short tutorial on how to use the bot',
  execute(message, args){
    const embed = new Discord.MessageEmbed;
    embed.setTitle('Tutorial');
    embed.setColor('FE5F55');
    embed.addField('Starting a new game','use `.start` command');
    embed.addField('Lost the current task?','use `.current` to get it again');
    embed.addField('How to progress?','use `.submit <i/t>` to submit');
    embed.addField('Need a hint?','shhh use `.hint`');
    embed.setFooter('Learn more in `.credits`');
    message.channel.send(embed);
  }
}