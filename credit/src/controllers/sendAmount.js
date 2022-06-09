import saveAmount from "../clients/saveAmount.js"

export default async (req, res) => {
  const amount = await saveAmount(req.body.amount);
  res.json(amount);
};
