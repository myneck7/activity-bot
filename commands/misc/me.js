const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let img = await client.getImg(message.guild, message.author.id);
        let data = await client.getPlayer(message.guild, message.author.id);
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    .addField('**Score**', `${data.score} points`)
                    .addField('**On break**', `${data.onBreak}`)
                    .setImage(img)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.ME;