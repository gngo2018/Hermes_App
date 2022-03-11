import express from 'express'

//Routes
const ping = require("./api/ping")

const app = express();
const port = 3005; //TODO: Add environment variable here

app.use("/api/ping", ping);

app.listen(port, () => {
  console.log(`Hermes Server running on port ${port}.`);
});