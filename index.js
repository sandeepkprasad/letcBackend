const connectDB = require("./db");
const express = require("express");
const cors = require("cors");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/user", require("./routes/auth"));
app.use("/notification", require("./routes/notification"));
app.use("/enquiry", require("./routes/enquiry"));
app.use("/gallery", require("./routes/gallery"));
app.use("/banner", require("./routes/banner"));
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`LETC is running on PORT : ${PORT}`);
});
