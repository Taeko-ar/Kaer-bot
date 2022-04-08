import fs from "fs";
import { Client, Collection, Intents } from "discord.js";
import { token } from "./config.json";
import { getCommandFiles, getButtonFiles } from "utils/files";
import { handleCommands, handleButtons } from "utils/interactions";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

module.exports = client;

client.commands = new Collection();
client.buttons = new Collection();

getCommandFiles().forEach((command) => {
  client.commands.set(command.data.name, command);
});
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`).default;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

//client.on("interactionCreate", handleCommands(client));
//client.on("interactionCreate", handleButtons(client));

client.on("interactionCreate", (interaction, ...params) => {
  interaction.respond = async (...args) => {
    try {
      return await interaction.reply(...args);
    } catch (error) {
      interaction.followUp(...args);
    }
  };

  interaction.superClient = client;

  handleCommands(client)(interaction, ...params);
});

client.login(token);
