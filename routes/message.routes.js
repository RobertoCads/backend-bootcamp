const router = require("express").Router();
const MessageAppService = require("../services/messageapp.service");
const Message = require("../Model/Message.model");

router.get("/message", (req, res) => {
  res.json("Hello world");
});

router.post("/messages", (req, res) => {
  const { destination, message, number } = req.body;

  const body = message;

  if (!destination && !body) {
    return res.status(400).json({
      message:
        "The keys can't be empty. The necessary keys are destination and message",
    });
  }
  if (
    (destination && typeof destination !== "string") ||
    (body && typeof body !== "string")
  ) {
    return res.status(400).json({ message: "The values must be strings" });
  }
  if (!destination) {
    return res.status(400).json({
      message:
        "The key destination must exist. The necessary keys are destination and message",
    });
  }
  if (!body) {
    return res.status(400).json({
      message:
        "The key message must exist. The necessary keys are destination and message",
    });
  }
    MessageAppService.sendMessage(destination, body)
      .then((response) => {
        const status = response.status === 200 && response.data === "OK"
        return Message.create({destination, message: body, number: parseInt(number), status})
      })
      .then(response => res.json(response))
      .catch((err) => {
        res.json(err)
        Message.create({send: "Message not sended"})
        // if (
        //   !err.config.data.includes("destination") &&
        //   !err.config.data.includes("body")
        // ) {
        //   return res.status(400).json({
        //     message:
        //       "The keys can't be empty. The necessary keys are destination and message",
        //   });
        // }
        // if (!err.config.data.includes("destination")) {
        //   return res.status(400).json({
        //     message:
        //       "The key destination must exist. The necessary keys are destination and message, must be string",
        //   });
        // }
        // if (!err.config.data.includes("body")) {
        //   return res.status(400).json({
        //     message:
        //       "The key message must exist. The necessary keys are destination and message, must be string",
        //   });
        // }
        if (err.status === 504) {
          return Message.create({send: "The message was sent", confirmed: false})
        }
      })

});

router.get("/messages", (req, res) => {
  Message
    .find()
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

module.exports = router;
