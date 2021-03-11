const Datastore = require("nedb");
const db = require("../data/db.js");
const Discord = require("discord.js");
const task = require("./taskarray.js");
module.exports = {
  name: "current",
  args: false,
  aliases: ["c", "ct" , 'currenttask'],
  description:
    "You forgot the task you were assigned?No worries. Here they are.",
  execute(message, args) {
    const embed = new Discord.MessageEmbed();
    db.findOne({ uid: message.author.id }, function(err, doc) {
      if (doc === null) {
        embed.setColor("FE5F55");
        embed.setTitle("use `.start` to use this command");
        return message.channel.send(embed);
      }
      embed.setColor("BDD5EA");
      embed.setTitle(task[doc.currtask][3]);
      embed.setDescription(task[doc.currtask][0]);
      embed.setFooter(`Trust:${doc.trust}\nUse .submit to submit or .hint for hint`);
      message.channel.send(embed);
    });
  }
};
