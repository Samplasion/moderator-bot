exports.run = async (client, message, args) => {
  // msg.channel.send("pong!")
  const msg = await message.channel.send("Ping?");
  /*msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);*/
  const embed = {
  "title": "Ping command results",
  "description": `Pong! Here are the results of the \`${client.config.prefix}ping\` command`,
  "color": 4875195,
  "timestamp": new Date(),
  "footer": {
    "icon_url": msg.author.avatarURL,
    "text": `${client.config.prefix}ping`
  },
  "thumbnail": {
    "url": msg.author.avatarURL
  },
  "author": {
    "name": `${client.user.tag}`,
    "icon_url": msg.author.avatarURL
  },
  "fields": [
    {
      "name": "Latency",
      "value": `${msg.createdTimestamp - message.createdTimestamp}ms`,
      "inline": true
    },
    {
      "name": "API Latency",
      "value": `${Math.round(client.ping)}ms`,
      "inline": true
    }
  ]
};
msg.edit({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pong'],
  permLevel: 0
};

exports.help = {
  name: "ping",
  category: "System",
  description: "It pings and then pongs!",
  usage: "ping"
}