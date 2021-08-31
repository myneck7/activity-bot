// Require the necessary discord.js classes
const { TOKEN, PREFIX } = require('./util/config.json');
const GotoClient = require('./structures/GotoClient');

let client = new GotoClient({
    prefix: PREFIX
});

client.login(TOKEN);