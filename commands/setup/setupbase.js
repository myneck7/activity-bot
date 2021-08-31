module.exports.run = (client, message, args) => {
    let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY")

    message.guild.channels.create('base', {
        parent: c
    });

    return message.reply('examination chamber renovated');
};

module.exports.help = {
    name:"setupbase",
    aliases: ["setupbase", "setupB", "setup3"],
    description:"setup the base channel",
    cooldown: 5,
    usage: '',
    args: false
};