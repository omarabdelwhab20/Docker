import express from "express";
//import mongoose from "mongoose";
import redis from "redis";
import {Client} from "pg";

const app = express();



const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

redisClient.connect();

const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = "5432";
const DB_HOST = "postgres";
const DB_NAME = "mydb";

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const client = new Client({
  connectionString,
});

client
  .connect()
  .then(() => console.log("Postgresql connected"))
  .catch((err) => console.log("Failed to connect to postgresql", err));

//const DB_USER = "root";
//const DB_PASSWORD = "example";
//const DB_PORT = 27017;
//const DB_HOST = "mongo";
//const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

/*mongoose
  .connect(URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Failed to connecto to the db: ", err));
*/
app.get("/", (req, res) => {
  redisClient.set("products", "products...");
  res.send("<h2>Hello tresmerge</h2>");
});

app.get("/data", async (req, res) => {
  const products = await redisClient.get("products");
  res.send(`<h1>Hello tresmerge</h1> <h2>${products}</h2>`);
});

app.listen(8000, () => {
  console.log("App running on port 8000");
});
