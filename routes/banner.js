const express = require("express");
const router = express.Router();
const Banner = require("../models/BannerSchema");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/bannerimage");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    const banner = Banner.create({ image: req.file.filename });
    res.json(banner);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/getbanner", async (req, res) => {
  try {
    const data = await Banner.find();
    res.send(data);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.delete("/deletebanner/:id", async (req, res) => {
  try {
    let image = await Banner.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }

    image = await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: "Image deleted." });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
