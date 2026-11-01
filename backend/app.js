const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'https://frontend-ecom-self.vercel.app',
    credentials: true
}));

const errorMiddleware = require("./middlewares/error");

const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");

const path = require("path");

app.use(express.json());

app.use(cookieParser());

dotenv.config({
  path: path.join(__dirname, "config/config.env"),
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

app.use(errorMiddleware);

module.exports = app;
