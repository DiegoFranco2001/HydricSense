const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const restGet = require("./requests/response");
const posts = require("./requests/post");
const remove = require("./requests/delete");

app.use(express.json());
app.use(cors());

restGet(app);
posts(app);
remove(app);

server.listen(process.env.PORT || 3002, () => {
    console.log("listening on *:3002");
});
