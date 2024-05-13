const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {

        unique_name: {
            type: String,
            require: true
        },
        name: {
            type:String,
            require: true
        },
        address: {
            type:String,
            require: true
        },
        employed: {
            type:Number,
            require: true
        },
    },
    {timestamps: true}

);

module.exports = mongoose.model('Company', companySchema);