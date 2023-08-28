const express = require("express");
const router = express.Router();
const Enquiry = require("../models/EnquirySchema");

router.get("/getenquiry", async (req, res) => {
  try {
    const enquiry = await Enquiry.find();
    res.send(enquiry);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/addenquiry", async (req, res) => {
  const { name, number, course } = req.body;

  try {
    const enquiry = new Enquiry({
      name,
      number,
      course,
    });

    const saveEnquiry = await enquiry.save();
    res.json(saveEnquiry);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
