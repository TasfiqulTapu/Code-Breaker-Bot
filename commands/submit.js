const Datastore = require("nedb");
let db = require("../data/db.js");
const Discord = require("discord.js");
let task = require("./taskarray.js");
module.exports = {
  name: "submit",
  args: true,
  aliases: ["s", "sub", "flag"],
  usage: "<important/i/trash/t>",
  description: "Submit your task to higher ups",
  execute(message, args) {
    const embed = new Discord.MessageEmbed();
    db.findOne({ uid: message.author.id }, function(err, doc) {
      if (doc == null) {
        embed.setColor("FE5F55");
        embed.setTitle("Use .start to use this command");
        return message.channel.send(embed);
      } else {
        let cstate = doc.state;
        let ctask = doc.currtask;
        let ctrust = doc.trust;
        let imp = task[ctask][1];
        console.log(doc);

        if (args == "i" || args == "important" || args == "imp") {
          db.findOne({ uid: message.author.id }, function(err, doc) {
            if (imp > 0) {
              ctrust = ctrust + imp;
              ctask = ctask + 1;
            } else {
              ctrust = ctrust - 1;
              ctask = ctask + 1;
            }
            if (ctask == undefined) console.log("buggggggg....");
            db.update(
              { uid: message.author.id },
              { $set: { trust: ctrust } },
              {},
              function(err, numReplaced) {
                cstate += 1;
              }
            );
          });
        } else if (args == "t" || args == "trash") {
          db.findOne({ uid: message.author.id }, function(err, doc) {
            if (imp > 0) {
              ctrust = ctrust - imp;
              ctask = ctask + 1;
            } else {
              ctrust = ctrust + imp;
              ctask = ctask + 1;
            }
            if (ctask == undefined) console.log("2buggggggg....");
            db.update(
              { uid: message.author.id },
              { $set: { trust: ctrust } },
              {},
              function(err, numReplaced) {
                cstate += 1;
              }
            );
          });
        } else {
          return message.channel.send(
            "Use one of these arguments:`<important/i/trash/t>`"
          );
        }
        if (ctrust < 1) {
          db.remove({ uid: message.author.id }, { multi: true }, function(
            err,
            numRemoved
          ) {
            embed.setColor("FE5F55");
            embed.setTile("Ending Found: Execution");
            embed.setDescription(
              "You were thought to be sabotaging the military and thus were executed"
            );
            embed.setFooter("Use .start to start a new game");
            return message.channel.send(embed);
          });
        }
        console.log(ctrust + "" + cstate + "" + ctask);

        if (ctask >= task.length - 1) {
          if (ctrust >= 6) {
            embed.setColor("295135");
            embed.setTitle("Ending Found: Victory");
            embed.setDescription("The nation of Acklana has won the war");
            embed.setFooter("Use .start to play a new game");
            db.remove({ uid: message.author.id }, { multi: true }, function(
              err,
              numRemoved
            ) {
              return message.channel.send(embed);
            });
          } else if (ctrust < 6) {
            embed.setColor("295135");
            embed.setTitle("Ending Found: Defeat");
            embed.setDescription(
              "The nation of Acklana has lost the war and you and your family were imprisoned"
            );
            embed.setFooter("Use .start to play a new game");
            db.remove({ uid: message.author.id }, { multi: true }, function(
              err,
              numRemoved
            ) {
              return message.channel.send(embed);
            });
          }
        } else {
          db.update(
            { uid: message.author.id },
            { $set: { state: cstate } },
            {},
            function(err, numReplaced) {
            }
          );
          db.update(
            { uid: message.author.id },
            { $set: { currtask: ctask + 1 } },
            {},
            function(err, numReplaced) {
              if (task[ctask] != undefined) {
                embed.setColor("BDD5EA");
                embed.setTitle(task[ctask][3]);
                embed.setDescription(task[ctask][0]);
                embed.setFooter(
                  `Trust: ${ctrust} \nUse .s to submit or .h for hint`
                );
                message.channel.send(embed);
              }
            }
          );
          let temp = task[ctask][1];
          db.update(
            { uid: message.author.id },
            { $set: { imp: temp } },
            {},
            function(err, numReplaced) {}
          );
        }
      }
    });
  }
};