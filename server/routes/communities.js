import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import Community from "../models/Community.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(200).json([]);
    }

    const query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { desc: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const communities = await Community.find(query)
      .populate("creator", "name")
      .limit(10)
      .select("name desc capacity members admins");

    res.status(200).json(communities);
  } catch (error) {
    return res.status(500).json({
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

router.get("/check-name", async (req, res) => {
  const { name } = req.query;

  try {
    const exists = await Community.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (exists) {
      return res.json({ available: false });
    } else {
      return res.json({ available: true });
    }
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

router.get("/join/:id", async (req, res) => {
  console.log(req.user);
  if (!req.user) {
    return res.status(401).send("User not logged in");
  }
  try {
    const result = await Community.findOne({ _id: req.params.id })
      .populate("members")
      .exec();
    if (
      result.members.some((member) => member._id.toString() == req.user._id)
    ) {
      return res.status(409).send("User already in community");
    } else {
      result.members.push(req.user._id);
      await result.save();
      return res.send("Success");
    }
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

router.post("/create", async (req, res) => {
  console.log("/create hit");
  const commInfo = req.body;
  try {
    const existing = await Community.findOne({ name: commInfo.name });
    if (existing) {
      return res.status(409);
    }
    console.log("Community: ", commInfo);

    const community = await Community.create({
      name: commInfo.name,
      desc: commInfo.desc,
      members: [req.user._id],
      admins: [req.user._id],
      capacity: commInfo.capacity,
      privacy: commInfo.privacy,
      creator: req.user._id,
    });
    console.log("Insertion successful");
    res.status(200).json(community);
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  console.log("/:id hit");
  try {
    const result = await Community.findOne({ _id: req.params.id })
      .populate("creator")
      .populate("members")
      .populate("admins")
      .exec();
    const responseData = result.toObject();
    responseData.joined = result.members.some(
      (member) => member._id.toString() == req.user._id
    );

    res.status(200).json(responseData);
  } catch (e) {
    return res.status(500).json({
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

export default router;
