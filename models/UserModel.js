const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
<<<<<<< HEAD
        fullName: String,
        username: String,
        email: { type: String, unique: true },
        password: String,
        favourites: [{ type: Schema.Types.ObjectId, ref: "cards" }]
=======
    fullName: String,
    username: String,
    email: {type: String, unique: true},
    password: String,
    favourites: [{type: Schema.Types.ObjectId, ref: 'cards'}]
>>>>>>> fdbaaa3948fe69016e2f7c6defd5ece868c8af77
    }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;