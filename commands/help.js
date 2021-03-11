const Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Find out how to use that goddamn command.",
  aliases: ["commands","command"],
  usage: "[command name]",
  execute(message, args) {
    const data = [];
    const { commands } = message.client;
    const embed = new Discord.MessageEmbed();
   // const embed2 = new Discord.MessageEmbed();
    if (!args.length) {
      embed.setColor("DARK_BUT_NOT_BLACK");
      embed.setTitle("Here's a list of all my commands:");
      embed.setDescription(commands.map(command => command.name).join(", "));
      embed.addField(
        "\nYou can send `.help [command name]` to learn about a specific command!",
        "\u200b",
        false,
      );
      return message.author
        .send(embed)
        .then(() => {
          if (message.channel.type === "dm") return;
         // embed2.setColor("DARK_BUT_NOT_BLACK");
         // embed2.setTitle();
          message.reply("I've sent you a DM with all my commands!");
        })
        .catch(error => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "It seems like I can't DM you! Do you have DMs disabled?"
          );
        });
    }
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) {
      return message.reply("That's not a valid command!");
    }

    // data.push(`**Name:** ${command.name}`);
    embed.setTitle(`Name: ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** .${command.name} ${command.usage}`);
    embed.setDescription(data,{split:true});
   // message.channel.send(data, { split: true });
    message.channel.send(embed);
  }
};
