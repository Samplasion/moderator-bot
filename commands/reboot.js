exports.run = async (client, msg, args) => {
  await msg.channel.send("I'm **rebooting**...");
  process.exit();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['restart'],
  permLevel: 10
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Restarts the bot",
  usage: "reboot"
}