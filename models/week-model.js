const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const week_schema = new Schema({
    text: {
        type: String,
        required: true,
        unique: true
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game',
        req: true
    }] ,
    picks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pick',
        req: true
    }] 
});
const week_model = new mongoose.model('week', week_schema);

module.exports = week_model;