import Queue from "bull"
import http from "http";
import saveMessage from "../clients/saveMessage.js";
import checkBudget from "../clients/checkBudget.js";
import saveAmount from "../clients/saveAmount.js";


export default (task, statusId) => {

    statusId && console.log("Processing Message", statusId)

    const queue = new Queue("my-first-queue", {
        redis: { host: "localhost", port: 6379}
        // redis: { host: "cache", port: 6379}
    })

    const main = async () => {
        console.log("Message Processing")
        await queue.add(task)
    }

    queue.process((job, done) => {
        job
        done()
    })
    
    main().catch(console.error)

}