exports.run = (client, msg, args) => {
  msg.channel.send("pong!")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pong'],
  permLevel: 0
};

exports.help = {
  name: "ping",
  category: "Basic",
  description: "It Pings and Pongs!",
  usage: "ping"
}