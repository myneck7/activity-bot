const {MESSAGES} = require('../../util/constants');
const { Permissions } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send("you can't use this command");
    await message.guild.roles.create({
        name: 'Activity Admin',
        color: 'GOLD',
        reason: 'Nobody expect the spanish inquisition',
    });

    let role = message.guild.roles.cache.find(role => role.name === "Activity Admin");
    await message.guild.channels.create('activity', {
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

    let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY")

    await message.guild.channels.create('base', {
        parent: c
    });

    await message.guild.channels.create('logs', {
        parent: c
    });

    return message.reply('bot installed');
};

module.exports.help = MESSAGES.COMMANDS.SETUP.SETUP;