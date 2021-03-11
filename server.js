const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");
const Datastore = require("nedb");
const express = require("express");
let db = require("./data/db.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = process.env.PREFIX;
const app = express();

app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("bot is up and running");
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (commandName == "ping") {
    const embed = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setTitle("**Ping Pong**🏓")
      .setDescription(
        `Latency is ${Date.now() -
          message.createdTimestamp}ms. API Latency is ${Math.round(
          client.ws.ping
        )}ms`
      );
    message.channel.send(embed);
  }
  if (!command) return;
  if (message.channel.type === "dm") {
    return message.reply("I can't execute that command inside DMs!");
  }
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    const erbed = new Discord.MessageEmbed();
    erbed.setTitle("Something went wrong");
    erbed.setColor("295135");
    erbed.setDescription(
      "Contact me on [Twitter](https://twitter.com/TasfiqulTapu) to report"
    );
    message.channel.send(erbed);
  }
});

client.on("guildCreate", guild => {
  let defaultChannel = "";
  if (guild.systemChannel != undefined) defaultChannel = guild.systemChannel;
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });
  defaultChannel.send(
    `Hey, thanks for inviting me, here are a list of all my commands!`,
    {
      embed: {
        title: "Prefix",
        color: "DARK_BUT_NOT_BLACK",
        description: "The prefix for all my commands is `.`, e.g: `.help` .",
        fields: [
          {
            name: "Start game",
            value: ".start"
          },
          {
            name: "View all commands",
            value: ".help"
          },
          {
            name: "Get a tutorial",
            value: ".tutorial"
          },
          {
            name: "Found a bug?",
            value: "Contact me on [Twitter](https://twitter.com/TasfiqulTapu)"
          }
        ],
        footer: {
          text: "Code Breaker created and developed by TAPU#9161."
        }
      }
    }
  );
});

client.on("ready", () => {
  const activities = [
    ["with dog", "PLAYING"],
    ["to some jam", "LISTENING"],
    ["time pass away", "WATCHING"],
    ["to birds chirping", "LISTENING"],
    ["clouds float away", "WATCHING"],
    ["in the rain", "PLAYING"]
  ];
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities.length - 1));
    client.user.setActivity(activities[index][0], {
      type: activities[index][1]
    });
  }, 30000);
});
client.login(process.env.BOTTOKEN);
