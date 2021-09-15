const mongoose = require("mongoose");
const {DEFAULTSETTINGS: defaults} = require("../util/config.json");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    prefix:{
        "type":String,
        "default": "$"
    },
    maxScore:{
        "type":Number,
        "default": 1000
    },
    dailyLoss:{
        "type":Number,
        "default":100
    },
    defaultScore:{
        "type":Number,
        "default": 500
    },
    img1:{
        "type": String,
        "default": 'https://i.imgur.com/AGRJFmF.png'
    },
    img2:{
        "type": String,
        "default": 'https://i.imgur.com/5MvDyI3.png'
    },
    img3:{
        "type": String,
        "default": 'https://i.imgur.com/NkvoduG.png'
    },
    img4:{
        "type": String,
        "default": 'https://i.imgur.com/bgdBW5W.png'
    }

});

module.exports = mongoose.model("Guild", guildSchema);