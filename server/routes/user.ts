import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";

class User {

    public express: express.Application;
    public logger: Logger;

    public users: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.users = [];
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // Route - Get All Users
        this.express.get("/users", (req, res, next) => {
            this.logger.info("url:" + req.url);
            res.json(this.users);
        });

        // Route - Search User
        this.express.get("/users/:userName", (req, res, next) => {
            this.logger.info("url:::::" + req.url);
            const user = this.users.filter(function(user) {
                if (req.params.userName === user.userName) {
                    return user;
                }
            });
            res.json(user);
        });

        // Route - Create New User
        this.express.post("/user", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            this.users.push(req.body.user);
            res.json(this.users);
        });
    }
}

export default new User().express;