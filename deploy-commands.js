import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId, token } from "./config.json";
import { getCommandFiles } from "utils/files";

const commands = getCommandFiles().map((command) => command.data.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

const deployCommands = async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

deployCommands();
