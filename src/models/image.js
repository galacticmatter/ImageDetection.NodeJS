const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    }
})

module.exports = new mongoose.model("Image", imageSchema);
