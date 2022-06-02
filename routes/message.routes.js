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
        return Message.create({destination, message: body, number: parseInt(number)})
      })
      .then(response => res.json(response))
      .catch((err) => {
        console.log(err)
        res.json(err)
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
        // if (err.message.includes("code 500")) {
        //   return res.status(500).json({ message: "Server Error" });
        // }
      })

});

module.exports = router;
