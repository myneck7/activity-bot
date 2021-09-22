const mongoose = require("mongoose");
const {Player} = require('../models/index');

module.exports = async client => {
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
    client.updateBreak = async (guild, player) =>{
        const data = await client.getPlayer(guild, player);
        if(!data) return null;
        if(data.onBreak == true){
            await Player.findOneAndUpdate({userId: player, guildId: guild.id},  {onBreak: false});
            return false;
        }
        else{
            await Player.findOneAndUpdate({userId: player, guildId: guild.id},  {onBreak: true});
            return true;
        }
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
};