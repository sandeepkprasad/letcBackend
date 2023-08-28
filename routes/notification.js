const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notification = require("../models/NotificationSchema");

router.get("/getnotification", async (req, res) => {
  try {
    const notification = await Notification.find();
    res.send(notification);
  } catch (error) {
    res.send("Internal server error");
  }
});

router.get("/usernotification", fetchUser, async (req, res) => {
  try {
    const userNotification = await Notification.find({ user: req.user.id });
    res.send(userNotification);
  } catch (error) {
    res.send("Internal server error");
  }
});

router.post("/addnotification", fetchUser, async (req, res) => {
  const { notification } = req.body;

  try {
    const notify = new Notification({
      notification,
      user: req.user.id,
    });

    const saveNotify = await notify.save();
    res.json(saveNotify);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

router.delete("/deletenotification/:id", fetchUser, async (req, res) => {
  try {
    let notify = await Notification.findById(req.params.id);

    if (!notify) {
      return res.status(404).json({ error: "Notification not found." });
    }

    notify = await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: "Notification deleted." });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
