const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreboardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    }
})

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema)

module.exports = Scoreboard