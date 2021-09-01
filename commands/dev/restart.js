const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {
    require('child_process').execSync('pm2 restart 0');
};

module.exports.help = MESSAGES.COMMANDS.DEV.RESTART;