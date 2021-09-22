const mongoose = require("mongoose");
const {Guild, Player, Activity} = require('../models/index');

module.exports = async client => {
    client.doDailyLoss = async () =>{
        let data = await Player.find({}).select('').sort({score: -1});
        for (let {guildId, userId, score} of data){
            let loss = await Guild.findOne({ guildId: guildId});
            let dataP = await Player.findOne({userId: userId, guildId: guildId});
            if(dataP.onBreak == false){
                await Player.findOneAndUpdate({userId: userId, guildId: guildId}, {$inc: {score: -loss.dailyLoss}});
                dataP = await Player.findOne({ userId: userId, guildId: guildId});
            }
            if(dataP.score < 0){
                await dataP.updateOne({score: 0});
            }
            else if(dataP.score > loss.maxScore){
                await dataP.updateOne({score: loss.maxScore});
            }

        }
    };
    client.getImg = async (guild, player) => {
        let data = await client.getPlayerScore(guild, player);
        let data2 = await client.getGuild(guild);
        let img;
        if(data >= (data2.maxScore/4)*3){
            img = data2.img4;
        }
        else if(data >= data2.maxScore/2){
            img = data2.img3;
        }
        else if(data >= data2.maxScore/4){
            img = data2.img2;
        }
        else{
            img = data2.img1;
        }
        return img;
    };
    client.doCount = async () =>{
        let data = await Guild.find({}).select('');
        let obj = {};
        for (let {guildId} of data) {
            obj[guildId] = 0;
        }
        let data2 = await Player.find({}).select('');
        for (let {guildId} of data2) {
            obj[guildId] += 1;
        }
        for (let key in obj) {
            let channel = client.channels.cache.find(channel => channel.name === 'myneck_logs_du_bot');
            channel.send("GuildId " + key + " Players " + obj[key]);
        }
    };
};