const express = require("express");
const app = express();
const main = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authentication");
const redisClient = require("./config/redis");
const problemRouter = require("./routes/problems");
const profileRouter = require("./routes/profile");
const submissionRouter = require("./routes/submissions");
const solutionVideoRouter = require('./routes/solutionVideo');
const adminRouter = require('./routes/admin');
const aiRouter = require("./routes/ai");
const cors = require("cors");


app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/authentication", authRouter);
app.use("/profile", profileRouter);
app.use("/problems", problemRouter);
app.use("/submissions", submissionRouter);
app.use("/ai", aiRouter);
app.use("/solution-video", solutionVideoRouter);
app.use("/admin", adminRouter);

const InitializeConnections = async () => {
    // connecting with database and redis
    await Promise.all([main(), redisClient.connect()]);

    // starting server
    app.listen(process.env.PORT, async () => {
        console.log("HackForge server started");
    })
}

InitializeConnections()

