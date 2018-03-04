const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
  client.logToModLog = async (channel, type, logText) => {
    const colors = {
      "kick": 0xffe100,
      "tempban": 0xffe100,
      "ban": 0xe82929
    }
    const log = new MessageEmbed()
      .setTitle(type.toProperCase())
      .setDescription(logText)
      .setColor(colors[type.toLowerCase()]);
    channel.send(log)
  }
};