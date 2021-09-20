const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let user = message.mentions.users.first();
        if (!user) {
            user = message.author;
        }

        let res = await client.updateBreak(message.guild, user.id);

        try {
            let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
            const embedLogs =
                new MessageEmbed().setColor('#fcf403')
                    .setTitle(`${user.username} (${user.id})`)
                    .setThumbnail(user.avatarURL())
                    .setDescription(`**Action** : editing the break\n**Player** : ${user.username}\n**On break** : ${res}`)
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
                    .setDescription(`**Action** : edit break\n**Status** : Done`)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.BREAK;