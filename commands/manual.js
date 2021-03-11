const Discord = require('discord.js');
module.exports = {
  name:'manual',
  aliases:['m','guide'],
  description:'Learn how to decode a message',
  execute(message,args){
    const embed = new Discord.MessageEmbed;
    if(!args.length){
      embed.setTitle('Manual');
      embed.setColor('WHITE');
      embed.setDescription('Flip though the pages by typing `.manual <#>` i.e. `.manual 0`');
      embed.setImage('https://i.imgur.com/pvSJxKm.png');
      message.channel.send(embed);
    }else{
      if(args[0] == '0'){
      embed.setTitle('Manual');
      embed.setColor('WHITE');
      embed.setDescription('Flip though the pages by typing `.manual <#>` i.e. `.manual 1`');
      embed.setImage('https://i.imgur.com/Qu9GrEc.png');
      message.channel.send(embed);
      }else if(args[0] == '1'){
      embed.setTitle('Manual');
      embed.setColor('WHITE');
      embed.setDescription('Flip though the pages by typing `.manual <#>` i.e. `.manual 2`');
      embed.setImage('https://i.imgur.com/fMzsKwZ.png');
      message.channel.send(embed);
      }else if(args[0] == '2'){
      embed.setTitle('Manual');
      embed.setColor('WHITE');
      embed.setDescription('Flip though the pages by typing `.manual <#>` i.e. `.manual 3`');
      embed.setImage('https://i.imgur.com/GvXXWN9.png');
      message.channel.send(embed);
      }else if(args[0] == '3'){
      embed.setTitle('Manual');
      embed.setColor('WHITE');
      embed.setDescription('Flip though the pages by typing `.manual <#>` i.e. `.manual 4`');
      embed.setImage('https://i.imgur.com/cFawp8s.png');
      message.channel.send(embed);
      }else if(args){
      embed.setTitle('Manual');
      embed.setColor('WHITE');
      embed.setDescription('Flip though the pages by typing `.manual <#>` i.e. `.manual 0`');
      embed.setImage('https://i.imgur.com/uImEPes.png');
      message.channel.send(embed);
      }
    }
  }
}