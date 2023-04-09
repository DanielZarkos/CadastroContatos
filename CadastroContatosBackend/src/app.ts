import "express-async-errors";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { globalRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(globalRoutes);

export default app;
