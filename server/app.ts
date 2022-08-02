import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "./logger/logger";
import Routes from "./routes/routes";
// const path = require('path');

class App {

    public express: express.Application;
    public logger: Logger;

    // public users: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        // this.users = [];
        this.logger = new Logger();
    }

    // Configure Express middleware
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(process.cwd() + "/front-app/dist/"));
    }

    // Configure routes
    private routes(): void {

        // Front routes
        this.express.get("/", (req, res, next) => {
            res.sendFile(process.cwd() + "/front-app/dist/index.html");
        });

        // API routes
        this.express.use("/api", Routes);

        // Handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct.");
        });
    }
}

export default new App().express;