require("./db/connection");
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/userRoutes");
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
