const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cardSchema = new Schema(
    {
        title: String,
        image: String,
        category: [String],
        location: String,
        address: String,
        arrond: String,
        websiteUrl: String,
        comments: String
    }
);

const CardModel = mongoose.model("cards", cardSchema);

module.exports = CardModel;

