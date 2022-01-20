const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
<<<<<<< HEAD
        fullName: String,
        username: String,
        email: { type: String, unique: true },
        password: String,
        favourites: [{ type: Schema.Types.ObjectId, ref: 'cards' }]
=======
    fullName: String,
    username: String,
    email: {type: String, unique: true},
    password: String,
    favourites: [{type: Schema.Types.ObjectId, ref: 'cards'}]
>>>>>>> c442143a219db31c91ae164deba46c414274240e
    }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;