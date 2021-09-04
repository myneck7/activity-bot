const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args, settings) => {
    const getSetting = args[0];
    const newSetting = args.slice(1).join(" ");

    switch(getSetting){
        case "prefix":{
            if (newSetting) {
                await client.updateGuild(message.guild, {prefix: newSetting});
                return message.channel.send(`Prefix updated: \`${settings.prefix}\` -> \`${newSetting}\` `);
            }
            message.channel.send(`Prefix: \`${settings.prefix}\``);
            break;
        }
        case "addplayer":{
            if (newSetting) {
                const user = message.mentions.users.first().id;
                let newPlayer = {guildId: message.guild.id, userId: user};
                await client.createPlayer(newPlayer);
                return message.channel.send(`true`);
            }
            message.channel.send(`false`);
            break;
        }
        case "updatescore":{
            if (newSetting) {
                const user = message.mentions.users.first().id;
                const newScore = args[2];
                await client.updatePlayer(message.guild, user, newScore);
                return message.channel.send(`true`);
            }
            message.channel.send(`false`);
            break;
        }
    }
};

module.exports.help = MESSAGES.COMMANDS.DEV.CONFIG;