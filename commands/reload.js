exports.run = (client, message, args) => {
  if(!args || args.size < 1) return message.reply("you must provide a command name to reload.");
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`the command \`${args[0]}\` has been reloaded`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command",
  usage: "reload <command>"
}