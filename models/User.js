const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        Username: {
            type: String,
            required: [true, "Must provide a name"],
            maxlength: 40,
            minlength: 3
        },

        // the match property has a  "regular expression or regex" to validate the email coming in
        email: {
            type: String,
            required: [true, "Please provide email"],
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email"],
            unique: true
        },

        password: {
            type: String,
            requried: [true, "Please provide password"],
            minlength: 8,
        },

        age: {
            type: Number,
            required:[true, "Must Provide Age"]
        },

        hobbies:{
            type: Array,
            required:[true, "Give some hobbies"]
        }

    }
)

module.exports=mongoose.model('User',UserSchema);