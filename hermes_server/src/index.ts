import express from 'express'
import cors from 'cors'
import Ping from "./api/ping"

const app = express();
const port = 3005;

const allowedOrigins = ['http://localhost:3000', 'https://hermes-app-blush.vercel.app/'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());

app.use("/api/ping", Ping);

app.listen(port, () => {
  console.log(`Hermes Server running on port ${port}.`);
});