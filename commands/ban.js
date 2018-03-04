exports.run = (client, message, [mention, ...reason]) => {
  if (message.mentions.members.size === 0)
    return message.reply(`the correct usage is: \`${this.help.usage}\``);

  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.reply("I don't have the permission to ban members.");

  const banMember = message.mentions.members.first();

  banMember.ban(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was succesfully banned.`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans someone from the guild.",
  usage: "ban <mention> [reason]"
}