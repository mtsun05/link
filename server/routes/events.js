import express from "express";
import "../services/passport.js";

import db from "../db/connection.js";

import Event from "../models/Event.js";

const router = express.Router();

router.get("/community/:id", async (req, res) => {
  try {
    const result = await Event.find({ community: req.params.id }).lean().exec();
    const finalEvents = result.map((event) => {
      const isJoined = event.participants.some(
        (participant) => participant.user.toString() === req.user._id.toString()
      );

      return {
        ...event,
        joined: isJoined,
      };
    });
    return res.json(finalEvents);
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      message: e.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Event.findOne({ _id: req.params.id })
      .populate("participants.user")
      .populate("community")
      .exec();

    const responseData = result.toObject();
    responseData.joined = result.participants.some(
      (person) => person.user.toString() == req.user._id
    );
    console.log(responseData.participants);
    res.status(200).json(responseData);
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      message: e.message,
    });
  }
});

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
      questions: eventInfo.questions,
      join_type: eventInfo.join_type,
      time: eventInfo.time,
      community: eventInfo.community,
    });

    res.status(200).json(event);
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      message: e.message,
    });
  }
});

router.post("/register/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("User not logged in");
  }
  try {
    const event = await Event.findOne({ _id: req.params.id })
      .populate("participants")
      .exec();
    if (
      event.participants.some(
        (person) => person.user._id.toString() == req.user._id
      )
    ) {
      return res.status(409).send("User already in event");
    } else {
      let regData = req.body;
      const participant = {
        user: req.user._id,
        role: regData.preferredRole,
        answers: regData.answers,
      };
      event.participants.push(participant);
      await event.save();
      return res.json({ event: event, participant: participant });
    }
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      message: e.message,
    });
  }
});

router.post("/leave/:id", async (req, res) => {
  console.log("Leaving...");
  const id = req.params.id;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $pull: {
          participants: { user: req.user._id },
        },
      },
      { new: true }
    );
    console.log("Successfully left");
    return res.json({
      message: "Successful",
      event: updatedEvent,
    });
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      message: e.message,
    });
  }
});

export default router;
