import {Message} from "../models/message.js";


export default (req, res) => {
    const { messageId } = req.params
    console.log(messageId)

    Message.find({statusId: messageId}, "status")
        .then(response => res.json(response))
}
