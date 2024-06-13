const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const todoRoutes = require("./routes/todos");
require("dotenv").config();
const conn = require("./config/database");
const schedule = require("node-schedule");
const axios = require("axios");
const mysql = require("mysql");
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  },
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;

try {
  conn.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database");
    }
  });
} catch (e) {
  console.error("Error:", e);
}

var db_config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_URL,
};

// Create a connection pool
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE_URL,
//   multipleStatements: true,
//   connectTimeout: 10000
// });

let pool = mysql.createPool(db_config);

pool.on("connection", function (_conn) {
  if (_conn) {
    logger.info("Connected the database via threadId %d!!", _conn.threadId);
    _conn.query("SET SESSION auto_increment_increment=1");
  }
});

app.use("/api/v1", todoRoutes);

let x = true;

app.get("/", (req, res) => {
  res.send(`<h1>This is simple port which is running at -====> ${PORT}</h1>`);
});

httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
