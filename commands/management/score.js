const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let activityName = args[0];
        let repetition = args[1];
        if (repetition == null) {
            repetition = 1;
        }
        let newScore = await client.getActivity(message.guild, activityName);
        newScore = newScore * repetition;
        await client.addPlayerScore(message.guild, message.author.id, newScore);

        try {
            await client.getEmbedLogsScore(client, message, activityName, repetition, newScore);

        }
        catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        await client.getEmbedPlayer(client, message, message.author);
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};


module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.SCORE;