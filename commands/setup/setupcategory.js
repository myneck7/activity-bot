module.exports.run = (client, message, args) => {
    let role = message.guild.roles.cache.find(role => role.name === "Spanish Inquisition");
    message.guild.channels.create('activity', {
        type: 'GUILD_CATEGORY',
        permissionOverwrites: [
            {
                id: role,
                allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'ADD_REACTIONS', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
            {
                id: message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            }
        ]
    });

    return message.reply('Interrogation building finished');
};

module.exports.help = {
    name:"setupcategory",
    aliases: ["setupcategory", "setupc", "setup2"],
    description:"setup the category",
    cooldown: 5,
    usage: '',
    args: false
};