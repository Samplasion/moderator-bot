exports.run = async (client, msg, args) => {
  msg.channel.send(`Your level: ${client.elevation(msg)[0]} (**${client.elevation(msg)[1]}**)`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "myperms",
  category: "System",
  description: "Shows your permission level.",
  usage: "myperms"
}