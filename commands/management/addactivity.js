const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        const act = args[0];
        const score = args[1];
        let newActivity;
        if (score && !isNaN(score)) {
            newActivity = {guildId: message.guild.id, activityName: act, score: score};
        } else {
            newActivity = {guildId: message.guild.id, activityName: act};
        }
        await client.createActivity(newActivity);

        try {
            await client.getEmbedLogsQuantity(client, message, user, "Adding an activity", score);

        }
        catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('GREEN')
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`**Action** : activity creation\n**Status** : Done`)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }

};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDACTIVITY;