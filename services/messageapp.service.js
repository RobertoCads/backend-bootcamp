const axios = require("axios")

class MessageAppService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  createMessage = (destination, body) => {
    return this.api.post("/message", { destination, body });
  };

}

const messageAppService = new MessageAppService()
module.exports = messageAppService