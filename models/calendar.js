const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
    title: String,
    start: String,
    description: String,
});

module.exports = mongoose.model("Calendar", CalendarSchema);