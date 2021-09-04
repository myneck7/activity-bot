const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    userId: String,
    score: {
        "type": Number,
        "default": 500
    }
});

module.exports = mongoose.model("Player", playerSchema);