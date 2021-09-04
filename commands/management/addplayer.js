const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message) => {
    const user = message.mentions.users.first().id;
    let newPlayer = {guildId: message.guild.id, userId: user};
    await client.createPlayer(newPlayer);
    return message.channel.send(`true`);


};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDPLAYER;