const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {
    let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY");
    let role = message.guild.roles.cache.find(role => role.name === "Spanish Inquisition");
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

    const embedLogs =
            new MessageEmbed().setColor('0xff0000')
                .setTitle(`${user.username} (${user.id})`)
                .setThumbnail(user.avatarURL())
                .setDescription(`**Action** : channel creation`)
                .setTimestamp()
                .setFooter(message.author.username, message.author.avatarURL());

    //const l = message.guild.channels.cache.find(l => l.name == "logs").id;
    client.channels.cache.get('882540386906693722').send({ embeds: [embedLogs]});

    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('GREEN')
                .setTitle(`${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`Channel creation done`)
        ]});
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.CREATE;