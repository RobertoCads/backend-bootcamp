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
      const status = response.status === 200 && response.data === "OK";
      return Message.create({
        destination,
        message: body,
        number: parseInt(number),
        status,
        send: "Message sended",
        confirmed: true,
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      res.json(err);
      Message.create({
        destination,
        message: body,
        number: parseInt(number),
        status: false,
        send: "Message not sended",
        confirmed: false,
      });

      if (err.status === 504) {
        return Message.create({
          destination,
          message: body,
          number: parseInt(number),
          status: false,
          send: "The message was sent",
          confirmed: false,
        });
      }
    });
});

router.get("/messages", (req, res) => {
  Message.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
