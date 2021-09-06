const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args, settings) => {
    let getSetting = args[0];
    let newSetting = args[1];
    if(getSetting != '1' && getSetting != 2 && getSetting != 3 && getSetting != 4 ){
        getSetting = 1;
    }
    if(!newSetting){
        newSetting = 'https://i.imgur.com/0iQM3WP.png';
    }

    switch(getSetting){
        case "1":{
            if (newSetting) {
                await client.updateGuild(message.guild, {img1: newSetting});
                return message.channel.send(`Image updated: \`${settings.img1}\` -> \`${newSetting}\` `);
            }
            message.channel.send(`Image: \`${settings.img1}\``);
            break;
        }
        case "2":{
            if (newSetting) {
                await client.updateGuild(message.guild, {img2: newSetting});
                return message.channel.send(`Image updated: \`${settings.img2}\` -> \`${newSetting}\` `);
            }
            message.channel.send(`Image: \`${settings.img2}\``);
            break;
        }
        case "3":{
            if (newSetting) {
                await client.updateGuild(message.guild, {img3: newSetting});
                return message.channel.send(`Image updated: \`${settings.img3}\` -> \`${newSetting}\` `);
            }
            message.channel.send(`Image: \`${settings.img3}\``);
            break;
        }
        case "4":{
            if (newSetting) {
                await client.updateGuild(message.guild, {img4: newSetting});
                return message.channel.send(`Image updated: \`${settings.img4}\` -> \`${newSetting}\` `);
            }
            message.channel.send(`Image: \`${settings.img4}\``);
            break;
        }
    }
};

module.exports.help = MESSAGES.COMMANDS.CONFIG.IMAGE;