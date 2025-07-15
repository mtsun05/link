import express from "express";
import "../services/passport.js";

import db from "../db/connection.js";

import Event from "../models/Event.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const eventInfo = req.body;
  try {
    const existing = await Event.findOne({ name: eventInfo.name });
    if (existing) {
      return res.status(409);
    }

    const event = await Event.create({
      name: eventInfo.name,
      desc: eventInfo.desc,
      capacity: eventInfo.capacity,
      roles: eventInfo.roles,
      join_type: eventInfo.join_type,
      time: eventInfo.time,
    });

    res.status(200).json(event);
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Event.findOne({ _id: req.params.id })
      .populate("participants")
      .populate("community")
      .exec();
    console.log("result: ", result);
    res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

export default router;
