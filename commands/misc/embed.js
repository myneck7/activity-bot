const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {
    message.channel.send({ embeds: [ new MessageEmbed().setColor('0xff0000').setDescription('hello') ]});
};

module.exports.help = MESSAGES.COMMANDS.MISC.EMBED;