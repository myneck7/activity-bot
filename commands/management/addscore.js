const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first().id;
    let newScore = args[2];
            if (!newScore) {
                newScore = 100;
            }
    await client.addPlayerScore(message.guild, user, newScore);
    return message.channel.send(`true`);
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDSCORE;