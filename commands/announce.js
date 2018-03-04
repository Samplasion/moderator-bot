exports.run = async (client, msg, [...announcement]) => {
  if (!announcement) msg.reply(`the correct usage is: \`${this.help.usage}\``)
  // return console.log(announcement.join(" "))
  const settings = client.settings.get(msg.guild.id);
  const channel = client.channels.get(settings.announcements);
  if (!channel) return msg.reply("come on! You have to **set** the `announcements` channel *before* announcing to it!")
  if (!channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES"))
    return msg.reply("I don't have the permission to send messages there.");
  channel.send(announcement.join(" "));
  msg.channel.send("Done!").then(m => {
    setTimeout(() => {
      m.delete();
    }, 2500)
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ann"],
  permLevel: 3
};

exports.help = {
  name: "announce",
  category: "Moderation",
  description: "Announces something in the channel defined as the announcements one with the setannouncements command.",
  usage: "announce <announcement>"
}