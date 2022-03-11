import express from 'express'
import Ping from "./api/ping";


const app = express();
const port = 3005; //TODO: Add environment variable here

app.use("/api/ping", Ping);

app.listen(port, () => {
  console.log(`Hermes Server running on port ${port}.`);
});