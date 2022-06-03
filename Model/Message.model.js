const { Schema, model } = require("mongoose")

const messageSchema = new Schema(
    {
        destination: {
            type: String
        },
        message: {
            type: String
        },
        number: {
            type: Number
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

const Message = model("Message", messageSchema)

Message.syncIndexes()

module.exports = Message