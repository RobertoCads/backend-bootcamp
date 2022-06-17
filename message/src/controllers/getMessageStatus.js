const getMessage = require("../clients/getMessage");
const metricExporter = require("../../metrics.js")


const counter = metricExporter("getMessageStatus", "getMessageStatus")

module.exports = function(req, res) {
  const messageId = req.params.messageId;
  const conditions = {
    _id: messageId
  };

  getMessage(conditions)
    .then(message => {
      if (message == null) {
        counter.inc({code: 501})
        res.statusCode = 404;
        res.end("Message not found");
      } else {
        counter.inc({code: 201})
        res.json({
          messageId,
          status: message.status
        });
      }
    })
};