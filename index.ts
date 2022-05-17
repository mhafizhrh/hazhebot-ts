import express from "express";
import dotenv from "dotenv";
import WAWebJS from "whatsapp-web.js";

dotenv.config();
const app = express();
const port = 8099;

const waBot = import("./lib/wa-bot");

app.get("/", async (req, res) => {
    res.send("hello world");
});

app.get("/ping", async (req, res) => {
    const userId = req.query.phone + "@c.us";
    const message = req.query.message as string;
    const bot = await waBot;
    try {
        await bot.default.sendMessage(userId, message);
        res.status(200).send({ status: 200, message: "success" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: "error" });
    }
});

app.listen(port, () => {
    console.log("express app started");
});

console.log("port", port);
