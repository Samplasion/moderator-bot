const Discord = require("discord.js");
String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}; 
exports.run = (client, message, args) => {
  const level = client.elevation(message)[0];
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Load guild settings (for prefixes and eventually per-guild tweaks)
    const settings = /*client.config;*/ client.settings.get(message.guild.id)

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = new Discord.Collection();
    
    client.commands.forEach(cmd => {
      if (cmd.conf.permLevel <= level) {
        myCommands.set(cmd.help.name, cmd);
      }
    });
 
    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = Array.from(myCommands.keyArray());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\nRemember: <required argument> [optional argument]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(output + `\n[There's a total of ${commandNames.length} commands.]`, {code: "asciidoc", split: { char: "\u200b" }});
  } else {
    // Show individual command's help.
    let command = args[0];
    const settings = client.config;
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < command.conf.permLevel) return;
      let ext;
      if (command.help.extended) {ext += "\nextended:: " + command.help.extended;} else {ext = "";};
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}${ext}\n= ${command.help.name} =`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'helf', 'ohellno'],
  permLevel: 0
};

exports.help = {
  name: "help",
  category: "System",
  description: "This command",
  usage: "help"
}