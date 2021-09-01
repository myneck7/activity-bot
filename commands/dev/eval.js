const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    function clean(text) {
        if (typeof text === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
    }

    if (message.author.id !== "215894426231242753") return;
    const code = args.join(" ");
    const evaled = eval(code);
    const cleanCode = await clean(evaled);
    message.channel.send("done");
};

module.exports.help = MESSAGES.COMMANDS.DEV.EVAL;