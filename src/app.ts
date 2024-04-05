import express from "express";
import bodyParser from "body-parser";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
