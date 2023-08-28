const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/UserSchema");

const JWT = "letc";

router.post(
  "/signup",
  [
    body("username", "Username must be 6 characters.").isLength({ min: 3 }),
    body("password", "Password must be 8 characters.").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      let user = await User.findOne({ username: req.body.username });

      if (user) {
        return res
          .status(400)
          .json({ success, error: "Admin is already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const genPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        password: genPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const jwtData = jwt.sign(data, JWT);
      success = true;
      res.json({ success, jwtData });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

router.post(
  "/login",
  [
    body("username", "Username must be 6 characters.").isLength({ min: 6 }),
    body("password", "Password must be 8 characters.").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: req.array() });
    }

    let user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res
        .status(400)
        .json({ success, error: "Invalid username or password" });
    }

    try {
      const passCompared = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passCompared) {
        return res
          .status(400)
          .json({ success, error: "Invalid username or password" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const jwtData = jwt.sign(payload, JWT);
      success = true;
      res.json({ success, jwtData });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
