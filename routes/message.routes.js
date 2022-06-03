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
        "The keys can't be empty. The necessary keys are destination, message and number",
    });
  }
  if (
    (destination && typeof destination !== "string") ||
    (body && typeof body !== "string")
  ) {
    return res.status(400).json({
      message: "The values of destination and message must be strings",
    });
  }
  if (!destination) {
    return res.status(400).json({
      message:
        "The key destination must exist and can't be null. The necessary keys are destination, message and number",
    });
  }
  if (!body) {
    return res.status(400).json({
      message:
        "The key message must exist and can't be null. The necessary keys are destination, message and number",
    });
  }
  if (!number) {
    return res.status(400).json({
      message:
        "The key number must exist and can't be null. The necessary keys are destination, message and number",
    });
  }
  MessageAppService.sendMessage(destination, body)
    .then((response) => {
      let status = "Message Not Sended";
      if (response.status === 200 && response.data === "OK") {
        status = "Message Sended";
      }
      return Message.create({
        destination,
        message: body,
        number: parseInt(number),
        status: status,
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      Message.create({
        destination,
        message: body,
        number: parseInt(number),
        status: "Message Not Sended",
      }).then((response) => res.status(500).json(response.status));

      if (err.status === 504) {
        return Message.create({
          destination,
          message: body,
          number: parseInt(number),
          status: "Message Sended but Not Confirmed",
        }).then((response) => res.status(504).json(response.status));
      }
    });
});

router.get("/messages", (req, res) => {
  Message.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
