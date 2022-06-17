const getMessages = require("../clients/getMessages");
const metricExporter = require("../../metrics.js")

const counter = metricExporter("getMessages", "getMessages")


module.exports = function(req, res) {
  getMessages().then(messages => {
    counter.inc({code: 201})
    res.json(messages);
  });
};
