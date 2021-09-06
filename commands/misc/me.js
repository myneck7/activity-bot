const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    let img = await client.getImg(message.guild, message.author.id);
    let score = await client.getPlayerScore(message.guild, message.author.id);
    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('0xff0000')
                .setTitle(`${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .addField('Score',`Current score : ${score}`)
                .setImage(img)
        ]});
};

module.exports.help = MESSAGES.COMMANDS.MISC.ME;