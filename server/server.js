import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";

import users from "./routes/users.js";
import auth from "./routes/auth.js";
import events from "./routes/events.js";
import communities from "./routes/communities.js";
import "./db/connection.js";
import session from "express-session";
import passport from "passport";

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);
app.use("/auth", auth);
app.use("/communities", communities);
app.use("/events", events);

const options = {
  key: fs.readFileSync("./localhost+2-key.pem"),
  cert: fs.readFileSync("./localhost+2.pem"),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
