const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {

        name: {
            type:String,
            require: true
        },
        surename: {
            type:String,
            require: true
        },
        role: {
            type:String,
            require: true
        },
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }        
    },
    {timestamps: true}

);

module.exports = mongoose.model('User', userSchema);