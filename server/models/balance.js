var mongoose = require('mongoose');

// create Stock schema
var BalanceSchema = new mongoose.Schema({
    Balance:{
    	type : Number,
        min : 0,
    	required : true
    },
    time:{
    	type : Date,
    	required : true
    },
    UserID:{
        type: String,
        required : true
    }
});

// Export the model schema
module.exports = BalanceSchema;
