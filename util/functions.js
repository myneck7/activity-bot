const mongoose = require("mongoose");
const {Guild, Player, Activity} = require('../models/index');
const {MessageEmbed} = require("discord.js");

module.exports = async client => {
    client.refactorNumbers = async (number) =>{
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    };
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
    client.getEmbedPlayer = async (client, message, user) =>{
        let img = await client.getImg(message.guild, user.id);
        let data = await client.getPlayer(message.guild, user.id);
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`${user.username}`)
                    .setThumbnail(user.displayAvatarURL())
                    .setTimestamp()
                    .addField('Score', `Current score : ${client.refactorNumbers(data.score)}`)
                    .addField('Silver', `${client.refactorNumbers(data.silver)} :moneybag:`)
                    .setImage(img)
            ]
        });
    };
    client.getEmbedLogsQuantity = async (client, message, user, reason, number) =>{
        let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
        const embedLogs =
            new MessageEmbed().setColor('#fcf403')
                .setTitle(`${user.username} (${user.id})`)
                .setThumbnail(user.avatarURL())
                .setDescription(`**Action** : ${reason}\n**Player** : ${user.username}\n**Value** : ${client.refactorNumbers(number)}`)
                .setTimestamp()
                .setFooter(message.author.username, message.author.avatarURL());
        client.channels.cache.get(l).send({embeds: [embedLogs]});
    };
    client.getEmbedLogsText = async (client, message, user, reason, text) =>{
        let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
        const embedLogs =
            new MessageEmbed().setColor('#fcf403')
                .setTitle(`${user.username} (${user.id})`)
                .setThumbnail(user.avatarURL())
                .setDescription(`**Action** : ${reason}\n**Player** : ${user.username}\n**Target** : ${text}`)
                .setTimestamp()
                .setFooter(message.author.username, message.author.avatarURL());
        client.channels.cache.get(l).send({embeds: [embedLogs]});
    };
    client.getEmbedLogsScore = async (client, message, activityName, repetition, newScore) =>{
        let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
        const embedLogs =
            new MessageEmbed().setColor('#3ac433')
                .setTitle(`${message.author.username} (${message.author.id})`)
                .setThumbnail(message.author.avatarURL())
                .setDescription(`**Action** : adding score\n**Player** : ${message.author.username}\n**Activity** : ${activityName}\n**Occurrence** : ${repetition}\n**Score** : ${newScore}`)
                .setTimestamp()
                .setFooter(message.author.username, message.author.avatarURL());
        client.channels.cache.get(l).send({embeds: [embedLogs]});
    };

};