exports.run = async (client, message, args, level) => {
  if (!args || args.length < 1) return message.reply("you must provide a command to reload.");

  let response = await client.unloadCommand(args[0]);
  if (response) return message.reply(`error while unloading: ${response}`);

  response = client.loadCommand(args[0]);
  if (response) return message.reply(`error while loading: ${response}`);

  message.reply(`the command \`${args[0]}\` has been reloaded`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 8
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that's been modified.",
  usage: "reload [command]"
};