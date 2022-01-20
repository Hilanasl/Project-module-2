const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cardSchema = new Schema(
    {
        title: String,
        image: String,
        dateStart: Date,
        dateEnd: Date,
        category: [String],
        location: String,
        address: String,
        arrond: String,
        websiteUrl: String,
        description: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }
);

const CardModel = mongoose.model("cards", cardSchema);

module.exports = CardModel;

