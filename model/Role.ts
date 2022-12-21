const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({

    // add role admin and user and
    role: {
        type: String,
        required: true,
    },

    
    

 


});

module.exports = mongoose.model("Role", RoleSchema);
