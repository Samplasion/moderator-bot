const { inspect } = require("util");

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  // Retrieve current guild settings
  const settings = client.settings.get(message.guild.id);
  
  // First, if a user does `-set add <key> <new value>`, let's add it
  if (action === "add") {
    if (!key) return message.reply("Please specify a key to add");
    if (settings[key]) return message.reply("This key already exists in the settings");
    if (value.length < 1) return message.reply("Please specify a value");

    // `value` being an array, we need to join it first.
    settings[key] = value.join(" ");
  
    // One the settings is modified, we write it back to the collection
    client.settings.set(message.guild.id, settings);
    message.reply(`${key} successfully added with the value of ${value.join(" ")}`);
  } else
  
  // Secondly, if a user does `-set edit <key> <new value>`, let's change it
  if (action === "set") {
    if (!key) return message.reply("please specify a key to edit");
    if (!settings[key]) return message.reply("this key does not exist in the settings");
    if (value.length < 1) return message.reply("please specify a new value");
  
    settings[key] = value.join(" ");

    client.settings.set(message.guild.id, settings);
    message.reply(`${key} successfully edited to ${value.join(" ")}`);
  } else
  
  // Thirdly, if a user does `-set del <key>`, let's ask the user if they're sure...
  if (action === "del") {
    if (!key) return message.reply("Please specify a key to delete.");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    
    // Throw the 'are you sure?' text at them.
    const response = await client.awaitReply(message, `Are you sure you want to permanently delete ${key}? This **CANNOT** be undone.`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response)) {

      // We delete the `key` here.
      delete settings[key];
      client.settings.set(message.guild.id, settings);
      message.reply(`${key} was successfully deleted.`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply("Action cancelled.");
    }
  } else
  
  if (action === "get") {
    if (!key) return message.reply("Please specify a key to view");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    message.reply(`The value of ${key} is currently ${settings[key]}`);
  } else {
    message.channel.send(inspect(settings), {code: "js"});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: 3
};

exports.help = {
  name: "conf",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view|get|set|del> <key> <value>"
};