import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";

import MongoStore from "connect-mongo";
import "./db/connection.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import events from "./routes/events.js";
import communities from "./routes/communities.js";
import session from "express-session";
import passport from "passport";

const PORT = process.env.PORT || 5050;
const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["https://localhost:5173", "https://link-sable-three.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);
app.use("/auth", auth);
app.use("/communities", communities);
app.use("/events", events);

if (process.env.NODE_ENV !== "production") {
  try {
    const options = {
      key: fs.readFileSync("./localhost+2-key.pem"),
      cert: fs.readFileSync("./localhost+2.pem"),
    };
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Development HTTPS Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.warn(
      "Could not start local HTTPS server (missing/invalid SSL certs?). Falling back to HTTP."
    );
    app.listen(PORT, () => {
      console.log(`Development HTTP Server listening on port ${PORT}`);
    });
  }
} else {
  app.listen(PORT, () => {
    console.log(`Production HTTP Server listening on port ${PORT}`);
  });
}
