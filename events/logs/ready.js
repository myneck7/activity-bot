const cron = require('cron');

module.exports = client => {
    let scheduledMessage = new cron.CronJob('* * 12 * * *', () => {
        client.doDailyLoss();
    });

    // When you want to start it, use:
    scheduledMessage.start();
    client.user.setPresence({ activities: [{ name: 'Crusades in Albion' }], status: 'dnd' });
    console.log("I'm ready !");
}