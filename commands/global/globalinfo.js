import { SlashCommandBuilder } from "@discordjs/builders";
import { msToTime, buildEmbed, randomColors } from "utils/utils";

const globalInfo = {
    data: new SlashCommandBuilder()
        .setName("globalinfo")
        .setDescription("Muestra informacion global del bot."),
    async execute(interaction) {

        const nya = interaction.superClient
        const guilds_length = Array.from(await nya.guilds.fetch())
        const ws_ping = await nya.ws.ping
        const uptime = msToTime(await nya.uptime)

        const embed = buildEmbed({
            title: `Informacion del bot`,
            fields: [{ name: 'Cantidad de servidores', value: `${guilds_length.length}`, inline: true },
            { name: 'Websocket', value: `${ws_ping}`, inline: true },
            { name: 'Uptime', value: `${uptime}`, inline: true }],
            color: randomColors()
        })
        return interaction.reply({ embeds: [embed] });
    },
};

export default globalInfo;
