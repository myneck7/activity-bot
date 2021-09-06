const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {
    let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY");
    let role = message.guild.roles.cache.find(role => role.name === "Activity Admin");
    let user = message.mentions.users.first();

    if(!user) return;

    message.guild.channels.create(user.username , {
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

    let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
    const embedLogs =
            new MessageEmbed().setColor('#03c2fc')
                .setTitle(`${user.username} (${user.id})`)
                .setThumbnail(user.avatarURL())
                .setDescription(`**Action** : channel creation`)
                .setTimestamp()
                .setFooter(message.author.username, message.author.avatarURL());
    client.channels.cache.get(l).send({ embeds: [embedLogs]});

    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('GREEN')
                .setTitle(`${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`**Action** : channel creation\n**Status** : Done`)
        ]});
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.CHANNEL;