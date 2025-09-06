const express = require("express");
const cors = require("cors");
const certificateRoutes = require("./routes/certificate");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", certificateRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
