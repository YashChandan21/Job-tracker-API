const express = require('express');
const applicationsRouter = require('./routes/applications.routes');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) =>{
    res.send("Welcome to the Job Tracker API");
});


app.use("/applications", applicationsRouter);

app.use((req,res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});


app.listen(3000, () =>{
    console.log("Job tracker API is running on port 3000");
});