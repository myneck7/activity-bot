const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        const name = args[0];
        await client.deleteActivity(message.guild.id, name);

        try {
            await client.getEmbedLogsQuantity(client, message, message.author, "Delete an activity", name);

        }
        catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('GREEN')
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`**Action** : delete activity\n**Status** : Done`)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }

};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.DELETEACTIVITY;