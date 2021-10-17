const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message) => {
    try {
        const user = message.mentions.users.first();
        if (!user) return message.channel.send(`false`);
        ;
        let score = await client.getDefaultScore(message.guild);
        let newPlayer = {guildId: message.guild.id, userId: user.id, score: score};
        await client.createPlayer(newPlayer);

        try {
            await client.getEmbedLogsText(client, message, user, "Adding a player", user.username);

        }
        catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('GREEN')
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`**Action** : add player\n**Status** : Done`)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }

};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDPLAYER;