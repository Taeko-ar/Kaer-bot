import { countries } from 'country-code-lookup'
import { MessageEmbed } from "discord.js";


export const getCountryIsoName = (countryName) => countries.find(({ country }) => countryName?.toLowerCase() === country.toLowerCase())?.iso2 || ''

export const buildEmbed = ({ title, url, description, color, fields, guild, image, thumbnail, footer}) => {

    const embed = new MessageEmbed()

    title && embed.setTitle(title)
    description && embed.setDescription(description)
    color && embed.setColor(color)
    fields && embed.addFields(fields)
    image && embed.setImage(image)
    url && embed.setURL(url)
    thumbnail && embed.setThumbnail(thumbnail)
    embed.setTimestamp()
    embed.setFooter("Kaer ©", 'https://cdn.discordapp.com/emojis/889484735296995349.webp?quality=lossless')

    return embed;
}

export const getRandom = (items) => items[Math.floor(Math.random() * items.length)]

export const randomColors = () => getRandom([0x00ff80, 0xc8b40a, 0x2e2538, 0x02e85f, 0x1f4bdb])

export const msToTime = (duration) => {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

export const isNsfw = (interaction) => {

    if (!interaction.channel.nsfw) {
        const embed = buildEmbed({
            title: 'Este comando no se puede usar en un canal SFW'
        })

        interaction.reply({ ephemeral: true, embeds: [embed] })
    }

    return interaction.channel.nsfw;
}
