// Require the necessary discord.js classes
const { token, prefixx } = require('../config.json');
const GotoClient = require('./structures/GotoClient');

let client = new GotoClient({
    prefix: prefixx
});

client.login(token);