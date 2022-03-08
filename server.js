
const express = require("express");
const app = express();
const port = 5000;
const io = require("socket.io");
const http = require("http");

app.use(express.static(__dirname + "/build"))
app.get('/', (req, res) => {
res.sendFile("build/index.html")
})
 
app.listen(port, () => {
console.log(`Server is listening at http://localhost:${port}`)
})