const Discord = require('discord.js');

module.exports = {

    name:'invite',

    description: 'Invite **Code Breaker** to your server',

    aliases:['inv'],

    execute (message,args){

        const embed = new Discord.MessageEmbed;

        embed.setTitle('Invite');

        embed.setColor('FE5F55');

        embed.setDescription('[Code Breaker](https://discord.com/oauth2/authorize?client_id=819531103807209503&scope=bot)');

        embed.setFooter('people behind the bot `.devs`');

        message.channel.send(embed);

    }

}
