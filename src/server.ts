import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

import logger from "./common/logger";
import errorMiddleware from "./middlewares/error.middleware";
import { buildResponse } from "./common/utils";

import router from "./routes/router";

dotenv.config();

morgan.token("host", function (req: express.Request, _res) {
  return req.hostname;
});

const app = express();

app.use(cookieParser());

app.use(
  morgan(
    ":date[web] :method :host :url :status :res[content-length] - :response-time ms",
    {
      skip: function (req, _res) {
        return req.url === "/";
      },
    },
  ),
);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(403).send(buildResponse("", "invalid token", err));
  } else {
    next(err);
  }
});

const port = process.env.PORT || 8080;

app.use("/api/v1", router);
app.get("/", (_req: Request, res: Response) => {
  res.json({ msg: "server is up and running at port: " + port });
  return;
});

app.use(errorMiddleware);

app.listen(port, async () => {
  logger.info("App Started on port", { port });

  try {
    console.log("Database connection successful...");
  } catch (error) {
    logger.error(error);
  }
});
