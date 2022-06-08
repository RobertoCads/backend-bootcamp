import { createClient } from "redis";

export default async () => {
  const client = createClient({
    url: "redis://localhost:6379",
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.set("status", "Redis ON");
  const value = await client.get("status");
  console.log(value)
};
