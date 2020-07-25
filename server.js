const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var currentTables = [];
var waitingList = [];

app.get("/", function (req, res) {
    res.sendFile((path.join(__dirname, "/html/home.html")));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "/html/reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "/html/tables.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(currentTables);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitingList);
});

app.get("/api/clear", function(req, res) {
    waitingList = [];
    currentTables = [];
});

app.post("/api/tables", function (req, res) {
    let newCustomer = req.body;
    console.log(newCustomer);
    if (currentTables.length < 5) {
        console.log("got in quick");
        currentTables.push(newCustomer);
        return res.send(true);
    }
    else {
        console.log("on the wait list");
        waitingList.push(newCustomer);
        return res.send(false);
    }

});

app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
});