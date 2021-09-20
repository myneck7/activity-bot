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
            let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
            const embedLogs =
                new MessageEmbed().setColor('#03c2fc')
                    .setTitle(`${user.username} (${user.id})`)
                    .setThumbnail(user.avatarURL())
                    .setDescription(`**Action** : add a player\n**Name** : ${user.username}`)
                    .setTimestamp()
                    .setFooter(message.author.username, message.author.avatarURL());
            client.channels.cache.get(l).send({embeds: [embedLogs]});
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