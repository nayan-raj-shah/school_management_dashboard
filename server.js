const express = require("express")
const serverApp = express();

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

    // Serve all other Next.js pages
    serverApp.all("*", (req, res) => {
        return handle(req, res);
    });

    const server = serverApp.listen(3000);

    // Uncaught Exception
    process.on("uncaughtException", (err) => {
        console.log(`Error :: ${err.message}`);
        console.log("Shutting down the server due to Uncaught Exception");
        server.close(() => {
            process.exit(1);
        })
    })

    // Unhandled Promise Rejection
    process.on("unhandledRejection", (err) => {
        console.log(`Error :: ${err.message}`);
        console.log("Shutting down the server due to Unhandled Promise Rejection");
        server.close(() => {
            process.exit(1);
        })
    });
});