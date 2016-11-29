var mongoose = require('mongoose');

// create Stock schema
var StockSchema = new mongoose.Schema({
    Name:{
        type: String,
        required : true
    },
    Symbol:{
        type: String,
        required : true
    },
        Sector:{
        type: String,
        required : true
    },
           Industry:{
        type: String,
        required : true
    }
})

// Export the model schema
module.exports = StockSchema;
