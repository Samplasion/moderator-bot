exports.run = async (client, msg, args) => {
  if (!msg.mentions.channels.first()) return msg.reply(`the correct usage is: \`${this.help.usage}\``)
  const settings = client.settings.get(msg.guild.id);
  settings.announcements = msg.mentions.channels.first().id
  await client.settings.set(msg.guild.id, settings);
  msg.reply(`${msg.mentions.channels.first().id} successfully added as the announcements channel`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["setann", "annset", "annchan"],
  permLevel: 3
};

exports.help = {
  name: "setannouncements",
  category: "Moderation",
  description: "Sets the announcement channel, to use with the announce command.",
  usage: "setannouncements <channel>"
}