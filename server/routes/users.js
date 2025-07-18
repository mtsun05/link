import express from "express";
import "../services/passport.js";

import bcrypt from "bcrypt";
import User from "../models/User.js";
import Token from "../models/Token.js";
import passport from "passport";

const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

const genRefToken = async (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    communities: user.communities,
    admins: user.admins,
    date: new Date(),
  };
  let token = await jwt.sign(payload, secretKey, { expiresIn: "30d" });
  return token;
};

const genAccessToken = async (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    communities: user.communities,
    admins: user.admins,
    date: new Date(),
  };
  let token = await jwt.sign(payload, secretKey, { expiresIn: "30m" });
  return token;
};

router.get("/:username/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  console.log("Signup entered");
  const hashedPW = await bcrypt.hash(req.body.password, 10);
  console.log("hashed pw");
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPW,
    });
    console.log("inserted user", user);
    return res.status(201).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error in signup");
  }
});

router.post("/login", async (req, res) => {
  console.log("entered login");
  try {
    let user = await User.findOne({
      username: req.body.userInfo.username,
    });
    console.log("user found");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const passwordValid = await bcrypt.compare(
      req.body.userInfo.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    const refreshToken = await genRefToken(user);
    const accessToken = await genAccessToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.log("token cookied");

    try {
      const token = await Token.create({
        token: refreshToken,
        user: user._id,
        exp: refreshToken.exp,
      });
      console.log("token inserted");
    } catch (err) {
      console.error("Error inserting token: ", err);
    }

    return res.json({ accessToken });
  } catch (e) {
    console.error(e);
  }
});

router.post("/refresh", async (req, res) => {
  const refresh = res.cookies.refreshToken;
  if (!refresh) {
    return res.status(404).send({ message: "No refresh token found" });
  }
  return res.json({ token: refresh });
});

export default router;
