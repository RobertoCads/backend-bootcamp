const router = require("express").Router();
const MessageAppService = require("../services/messageapp.service");

router.get("/message", (req, res) => {
  res.json("Hello world");
});


router.post("/messages", (req, res) => {
  const { destination, message } = req.body;

  const body = message

  MessageAppService.sendMessage(destination, body)
    .then((response) => res.json(response.data))
    .catch((err) => res.json(err));
});


module.exports = router;
