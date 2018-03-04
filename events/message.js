exports.run = (client, message) => {
  if(message.content.indexOf(client.settings.get(message.guild.id).prefix) !== 0) return;

  const args = message.content.split(/ +/g);
  const command = args.shift().slice(client.config.prefix.length).toLowerCase();

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (cmd) {
    if (cmd.conf.permLevel <= client.elevation(message)[0]) {
      message.flags = [];
      while(args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
      }
      cmd.run(client, message, args);
    } else {
      message.reply("you don't have the permission to do so. " + `Your level: ${client.elevation(message)[0]} (**${client.elevation(message)[1]}**), required level: ${cmd.conf.permLevel} (**${client.textPerm(cmd.conf.permLevel)}**)`)
    }
  } else if(client.tags.has(command)) {
    message.edit(`${args.join(" ")} ${client.tags.get(command).contents}`);
  }
}