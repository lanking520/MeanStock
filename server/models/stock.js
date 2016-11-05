var mongoose = require('mongoose');

// create Stock schema
var StockSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    url:{
        type: String,
        required : true
    }
})

// Export the model schema
module.exports = StockSchema;
