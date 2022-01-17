const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cardSchema = new Schema(
    {
    title: String,
    image: req.file.url,
    category: { type: String, enum: ['museum', 'exhibition', 'street-art', 'public-space'] },
    location: String,
    address: String,
    arrond: { type: String, enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th'] },
    websiteUrl: String,
    comments: String
    }
);

const CardModel = mongoose.model("cards", cardSchema);

module.exports = CardModel;

