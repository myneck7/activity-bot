const mongoose = require("mongoose");
const {Guild, Player, Activity} = require('../models/index');

module.exports = async client => {
    client.createGuild = async guild =>{
        await client.deleteGuild(guild);
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save();
    }

    client.getGuild = async guild =>{
        const data = await Guild.findOne({ guildId: guild.id});
        return data;
    };
    client.deleteGuild = async guild =>{
        const data = await Guild.findOneAndDelete({ guildId: guild.id});
        return data;
    };

    client.getDefaultScore = async guild =>{
        const data = await Guild.findOne({ guildId: guild.id});
        return data.defaultScore;
    };

    client.updateGuild = async (guild, settings) =>{
        let data = await client.getGuild(guild);
        if(typeof data !== "object") data ={};
        for (const key in settings){
            if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }
    client.createPlayer = async (player) =>{
        console.log(player.guildId);
        console.log(player.userId);
        await client.deletePlayer(player.guildId, player.userId);
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, player);
        const createPlayer = await new Player(merged);
        createPlayer.save();
    }
    client.deletePlayer = async (guild, player) =>{
        const data = await Player.findOneAndDelete({ guildId: guild, userId: player});
    }
    client.getPlayer = async (guild, player) =>{
        const data = await Player.findOne({ userId: player, guildId: guild.id});
        return data;
    };
    client.getAllPlayer = async (guild) =>{
        const data = await Player.find({ guildId: guild.id}).select('-guildId -_id -__v').sort({score: -1});
        return data;
    };
    client.getPlayerScore = async (guild, player) =>{
        const data = await Player.findOne({ userId: player, guildId: guild.id});
        if(!data) return null;
        return data.score;
    };

    client.addPlayerScore = async (guild, player, newScore) =>{
        let data = await client.getPlayer(guild, player);
        if(data != null) {
            let data2 = await client.getGuild(guild);
            let ns = Number(newScore);
            await data.updateOne({$inc: {score: ns}});
            data = await client.getPlayer(guild, player);
            if (data.score > data2.maxScore) {

                await data.updateOne({score: data2.maxScore});
            }
            else if (data.score < 0) {

                await data.updateOne({score: 0});
            }
        }
    }
    client.createActivity = async (activity) =>{
        await client.deleteGuild(activity.guildId, activity.activityName);
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, activity);
        const createActivity = await new Activity(merged);
        createActivity.save();
    }
    client.deleteActivity = async (guild, activityName) =>{
        await Activity.findOneAndDelete({ guildId: guild, activityName: activityName});
    }
    client.getActivity = async (guild, activityName) =>{
        const data = await Activity.findOne({ activityName: activityName, guildId: guild.id});
        return data.score;
    };
    client.getAllActivity = async (guild) =>{
        const data = await Activity.find({ guildId: guild.id}).select('-guildId -_id -__v');
        return data;
    };
    client.doDailyLoss = async () =>{
        let data = await Player.find({}).select('').sort({score: -1});
        for (let {guildId, userId, score} of data){
            let loss = await Guild.findOne({ guildId: guildId});
            await Player.findOneAndUpdate({userId: userId, guildId: guildId}, {$inc: {score: -loss.dailyLoss}})
            let data = await Player.findOne({ userId: userId, guildId: guildId});
            if(data.score < 0){
                await data.updateOne({score: 0});
            }
            else if(data.score > loss.maxScore){
                await data.updateOne({score: loss.maxScore});
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