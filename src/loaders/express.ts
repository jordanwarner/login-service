import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api";
import config from "../config";
import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../types/response-error";

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new ResponseError("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use(
    (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
      /**
       * Handle 401 thrown by express-jwt library
       */
      if (err.name === "UnauthorizedError") {
        return res
          .status(err.status ? err.status : 401)
          .send({ message: err.message })
          .end();
      }
      return next(err);
    }
  );
  app.use(
    (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  );
};
