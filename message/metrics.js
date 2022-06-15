module.exports = (name = "principal", help = "principal") => {   
  const client = require("prom-client")
  
  const Counter = client.Counter;
  const counter = new Counter({
    name,
    help,
    labelNames: ["code"],
  });
  counter.inc()
  return counter
}
