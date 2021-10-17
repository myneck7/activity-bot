const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY");
        let role = message.guild.roles.cache.find(role => role.name === "Activity Admin");
        let user = message.mentions.users.first();

        if (!user) return;

        await message.guild.channels.create(user.username, {
            parent: c,
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: role,
                    allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'ADD_REACTIONS', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: user.id,
                    allow: ['VIEW_CHANNEL']
                }
            ]
        });
        try {
            await client.getEmbedLogsQuantity(client, message, user, "Channel created", user.username);

        } catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('GREEN')
                    .setTitle(`${user.username}`)
                    .setThumbnail(user.displayAvatarURL())
                    .setDescription(`**Action** : channel creation\n**Status** : Done`)
            ]
        });
    } catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.CHANNEL;