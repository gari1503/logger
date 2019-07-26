var logger = {};

if (typeof window === 'undefined' && typeof process === 'object') {
    //is Node
    console.log("********* is Node ********");
    const winston = require("winston");
    const fs = require("fs");
    const path = require("path");

    const logDir = "logInfo";
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

  logger = winston.createLogger({
    // change level if in dev environment versus production
    level: process.env.env === "local" ? "debug" : "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        new winston.transports.File({
            name: "file#info",
            level: "info",
            filename: path.join(logDir, "info.log")
        }),
        new winston.transports.File({
            name: "file#debug",
            level: "debug",
            filename: path.join(logDir, "debug.log")
        }),
        new winston.transports.File({
            name: "file#error",
            level: "error",
            filename: path.join(logDir, "error.log")

         })],
    exitOnError: false
});

} else {
    const axios = require("axios");
    console.log("******* is client browser ***********");
    logger = {
        sendLogs: function (url) {
            axios.get(url);
            console.log("*** URL ****", url);
        }
    }
}

module.exports = logger;

