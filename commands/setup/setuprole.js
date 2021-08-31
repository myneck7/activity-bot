module.exports.run = (client, message, args) => {
    message.guild.roles.create({
        name: 'Spanish Inquisition',
        color: 'GOLD',
        reason: 'Nobody expect the spanish inquisition',
    });

    return message.reply('Nobody expect the spanish inquisition');
};

module.exports.help = {
    name:"setuprole",
    aliases: ["setuprole", "setupr", "setup1"],
    description:"setup the role",
    cooldown: 5,
    usage: '',
    args: false
};