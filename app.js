const express = require("express");
const dbSetup = require("./db/db-setup");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const articleRouter = require("./routes/article");
const imageRouter = require("./routes/image");

dbSetup();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/articles", articleRouter);
app.use("/upload", imageRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));

module.exports = app;
