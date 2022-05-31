const router = require("express").Router();
const MessageAppService = require("../services/messageapp.service");

router.get("/message", (req, res) => {
  res.json("Hello world");
});

router.post("/message", (req, res) => {
  const { destination, body } = req.body;

  MessageAppService.createMessage(destination, body)
    .then((response) => res.status(200).json(response.data))
    .catch(() => res.status(500).json("Server error"));
});

router.post("/messages", (req, res) => {
  const { destination, message } = req.body;
  
});

module.exports = router;
