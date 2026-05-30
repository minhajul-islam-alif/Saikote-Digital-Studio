import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./database/mongodb.js";
import { savePhotoDetails } from "./controllers/savePhoto.controller.js";
import { getTotalAmount, saveTotalAmount } from "./controllers/amount.controller.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Welcome to Saikote Digital Studio");
});
app.get("/amount", getTotalAmount);

app.post("/", savePhotoDetails, saveTotalAmount);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App running on: http://localhost:${PORT}`);
	connectDatabase();
});
