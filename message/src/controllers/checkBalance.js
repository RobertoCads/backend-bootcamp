// import checkBudget from "../../../credit/src/clients/checkBudget"
import saveMessage from "../clients/saveMessage.js"
import uniqid from "uniqid"
import queue from "./../utils/messageQueue.js"

export default async (req, res) => {
  const body = JSON.stringify(req.body);

  const statusId = uniqid()

  let message
  try {
      message = await saveMessage({
          ...req.body,
          status: "CHECKING BALANCE",
          statusId
      })
  } catch (err) {
      return res.status(500).json(err)
  }

  queue(message, statusId)

  res.status(200).json("Message Sended")
}
