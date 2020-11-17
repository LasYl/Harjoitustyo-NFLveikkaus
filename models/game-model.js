const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const game_schema = new Schema({
                                    
    game_number : {
        type: String,
        required: true,
        unique: true
    },
    date : {
        type: Date,
        required: true
    },
    day : {
        type: String,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    home: {
        type: String,
        required: true
    },
    hscore: {
        type: Number,
        required: false
    },
    visitor: {
        type: String,
        required: true
    },
    vscore: {
        type: Number,
        required: false
    }/* ,
    picks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pick',
        req: true
    }] */
});
const game_model = new mongoose.model('game', game_schema);

module.exports = game_model;