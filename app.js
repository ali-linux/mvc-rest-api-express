const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/restapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("db connected...");
  })
  .catch((err) => console.log(err.message));
const productRoute = require("./Routes/Products.route");

app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("Home Page");
});

app.use("/products", productRoute);

app.use((req, res, next) => {
  // const err = new Error("Page not found");
  // err.status = 404;
  // next(err);
  next(createError(404, "Page Not Found"));
  console.log(createError(404, "Page Not Found").message);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});
app.listen(3000, () =>
  console.log("listening on PORT ", PORT, " LINK: ", `http://localhost:${PORT}`)
);
