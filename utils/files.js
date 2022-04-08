import fs from "fs";

export const getCommandFiles = () => {
  const commands = [];
  const folders = fs.readdirSync("./commands");
  folders.forEach((folder) => {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    commandFiles.forEach((file) => {
      const command = require(`../commands/${folder}/${file}`);
      commands.push(command.default);
    });
  });

  return commands.filter((command) => command?.data);
};
