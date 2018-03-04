const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const config = require('./config.json');

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.config = config;

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    if(f.split(".").slice(-1)[0] !== "js") return;
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    console.log(`Loaded command: ${props.help.name}. 👌`);
    if(props.init) props.init(client);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification */
  let permlvl = 0, permtxt = "Normal User";
  let mod_role = message.guild.roles.find('name', client.config.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) {
    permlvl = 2;
    permtxt = "Moderator";
  };
  let admin_role = message.guild.roles.find('name', client.config.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) {
    permlvl = 3;
    permtxt = "Admin";
  };
  if (message.author.id === message.guild.ownerID) {
    permlvl = 4;
    permtxt = "Guild Owner";
  };
  if (message.author.id === client.config.ownerID) {
    permlvl = 10;
    permtxt = "Bot Owner";
  };
  return [permlvl, permtxt];
};

client.textPerm = permLvl => {
  var permtxt = "Normal User";
  if (permLvl === 2) {
    permtxt = "Moderator";
  };
  if (permLvl === 3) {
    permtxt = "Admin";
  };
  if (permLvl === 4) {
    permtxt = "Guild Owner";
  };
  if (permLvl === 10) permtxt = "Bot Owner";
  return permtxt;
};

client.login(process.env.SECRET)