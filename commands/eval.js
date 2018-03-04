exports.run = async (client, message, args) => {
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    message.channel.send(client.clean(evaled), {code:"xl"});
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates JavaScript code. RESERVED FOR BOT OWNER.",
  usage: "eval <js code to evaluate>"
}