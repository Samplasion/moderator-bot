exports.run = (client, message, [mention, ...reason]) => {
  if (message.mentions.members.size === 0)
    return message.reply(`the correct usage is: \`${this.help.usage}\``);

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.reply("I don't have the permission to kick members.");

  const kickMember = message.mentions.members.first();

  kickMember.kick(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was succesfully kicked.`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kicks someone from the guild.",
  usage: "kick <mention> [reason]"
}