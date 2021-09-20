const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        const name = args[0];
        await client.deleteActivity(message.guild.id, name);

        try {
            let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
            const embedLogs =
                new MessageEmbed().setColor('#2c29d6')
                    .setTitle(`${message.author.username} (${message.author.id})`)
                    .setThumbnail(message.author.avatarURL())
                    .setDescription(`**Action** : delete an activity\n**Name** : ${name}`)
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
                    .setDescription(`**Action** : delete activity\n**Status** : Done`)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }

};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.DELETEACTIVITY;