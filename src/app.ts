import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// App Routes (route handlers)
import { errorHandler } from "./middleware/errorHandler";
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
app.use("/api/v1/auth", appRoutes.authRoutes);
app.use("/api/v1/users", appRoutes.userRoutes);
app.use("/api/v1/teams", appRoutes.teamRoutes);

//error handling middleware
app.use(errorHandler);

export const router = express.Router();
export default app;
