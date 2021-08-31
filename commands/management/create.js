const {MessageEmbed} = require("discord.js");
module.exports.run = (client, message, args) => {
    let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY")
    let role = message.guild.roles.cache.find(role => role.name === "Spanish Inquisition");
    let user = message.mentions.users.first();

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


    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('0xff0000')
                .setTitle(`${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`Creation date : ${user.createdAt}`)
        ]});
};

module.exports.help = {
    name:"create",
    aliases: ["create", "c"],
    description:"create a channel for a user",
    cooldown: 5,
    args: true
};