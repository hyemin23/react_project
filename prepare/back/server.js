const express = require("express");
const postRouter = require("./routes/postRouter");
const app = express();

app.use(postRouter)

app.get("/", (req, res) => {
    res.send("hello express");
});


app.listen(3001, () => {
    console.log("서버 실행중")
});