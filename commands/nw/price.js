import { SlashCommandBuilder } from "@discordjs/builders";
import NwmpService from "services/nw/nwmp_service";
import { buildEmbed, randomColors } from "utils/utils";

const price = {
  data: new SlashCommandBuilder()
    .setName("precio")
    .setDescription("Busca el precio de un item en en nwmarketprices")
    .addStringOption((option) =>
      option.setName("item").setDescription("Item a buscar").setRequired(true)
    ),
  async execute(interaction) {
    const { value: item } = interaction.options.get("item");
    const result = await NwmpService.getItemPrice({ item });

    if (!result) {
      const embed = buildEmbed({
        title: 'No pude encontrar nada :('
      })

      return interaction.reply({ ephemeral: true, embeds: [embed] })
    };

    const embed = buildEmbed({
      title: `Informacion de ${result.item_name}`,
      thumbnail: result.img,
      fields: [{ name: 'Precio promedio', value: `${result.avg_price}`, inline: true },
      { name: 'Precio mas bajo', value: `${result.lowest_price}`, inline: true },
      { name: 'Precio mas alto', value: `${result.max_price}`, inline: true },
      { name: '% cambio', value: `${result.price_change}`, inline: true },
      { name: 'Cantidad de items', value: `${result.items_published}`, inline: true },
      { name: 'Ultima info', value: `${result.last_update}`, inline: true },
      { name: 'Link Base de datos', value: `${result.nwdb_link}`, inline: true }],
      color: randomColors()
    })
    return interaction.reply({ embeds: [embed] });
  },
};

export default price;
