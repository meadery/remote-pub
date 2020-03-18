import express from "express";
import { mainRoomLink, pubName } from "./config";

const app = express();

app.set("view engine", "squirrelly");
app.set("views", "views");

app.use("*", (req, res) => {
    res.render("index", {
        pageTitle: `Welcome to ${pubName}`,
        pubName: pubName,
        mainRoomLink: mainRoomLink
    });
});

export { app };
