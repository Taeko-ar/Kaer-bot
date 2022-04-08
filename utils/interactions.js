export const handleCommands = (client) => async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.respond({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};

export const handleButtons = (client) => async (interaction) => {
  if (!interaction.isButton()) return;

  const button = client.buttons.get(interaction.customId);
  try {
    await button.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.respond({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};
