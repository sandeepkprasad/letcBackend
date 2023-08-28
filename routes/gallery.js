const express = require("express");
const router = express.Router();
const Gallery = require("../models/GallerySchema");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/galleryimage");
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
    const gallery = Gallery.create({ image: req.file.filename });
    res.json(gallery);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/getgallery", async (req, res) => {
  try {
    const data = await Gallery.find();
    res.send(data);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.delete("/deletegallery/:id", async (req, res) => {
  try {
    let image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }

    image = await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: "Image deleted." });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});
module.exports = router;
