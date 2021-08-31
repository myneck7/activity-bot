module.exports.run = (client, message, args) => {
    message.channel.send("Pong!");
};

module.exports.help = {
    name:"ping",
    aliases: ["ping"],
    description:"send pong",
    cooldown: 1,
    usage: '',
    args: false
};