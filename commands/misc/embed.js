const {MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {
    message.channel.send({ embeds: [ new MessageEmbed().setColor('0xff0000').setDescription('hello') ]});
};

module.exports.help = {
    name:"embed",
    aliases: ["embed"],
    description:"send an embed",
    cooldown: 1,
    usage: '',
    args: false
};