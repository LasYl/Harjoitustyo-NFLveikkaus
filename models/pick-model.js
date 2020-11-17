const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pick_schema = new Schema({
                                    
    text : {
        type: String,
        required: true
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        
    },
    game_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        
    }
});
const pick_model = new mongoose.model('pick', pick_schema);

module.exports = pick_model;