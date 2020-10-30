const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const item = require("./routes/item");
const boxtype = require("./routes/boxtype");
const boxcart = require("./routes/boxcart");
const users = require("./routes/users");
const auth = require("./routes/auth");
const cors = require("cors");
const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/prod")(app);

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}

const corsOptions = {
    exposedHeaders: "x-auth-token",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname + "/public/"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/item", item);
app.use("/api/boxtype", boxtype);
app.use("/api/boxcart", boxcart);
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
