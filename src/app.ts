import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
// App Routes (route handlers)
import appRoutes from "./routes/routes";

dotenv.config();
// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.use("/api/v1/users", appRoutes.userRoutes);

export const router = express.Router();
export default app;
