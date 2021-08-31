module.exports.run = (client, message, args) => {
    require('child_process').execSync('pm2 restart 1');
};

module.exports.help = {
    name:"restart",
    aliases: ["restart"],
    description:"Restart the bot",
    cooldown: 1,
    usage: '',
    args: false
};