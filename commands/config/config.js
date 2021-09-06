const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message) => {
    let data = await client.getGuild(message.guild);
    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('GREEN')
                .setTitle(`${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .addFields(
                    { name: 'Prefix', value: ` \`${data.prefix}\``, inline:true },
                    { name: 'Max score', value: ` \`${data.maxScore}\``, inline: true },
                    { name: 'Daily loss', value: ` \`${data.dailyLoss}\``, inline: true },
                    { name: 'Default Score', value: ` \`${data.defaultScore}\``, inline: true },
                    { name: 'Image 1', value: ` \`${data.img1}\``, inline: false },
                    { name: 'Image 2', value: ` \`${data.img2}\``, inline: false },
                    { name: 'Image 3', value: ` \`${data.img3}\``, inline: false },
                    { name: 'Image 4', value: ` \`${data.img4}\``, inline: false }

                )
        ]});
};

module.exports.help = MESSAGES.COMMANDS.CONFIG.CONFIG;