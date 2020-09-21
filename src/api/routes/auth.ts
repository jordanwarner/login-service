import { Router, Request, Response } from "express";
import passport from "passport";
import samlStrategy from "../../config/saml";
import saml from "passport-saml";
import axios from "axios";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new saml.Strategy(samlStrategy, (profile: any, done: any) => {
      if (profile["urn:oid:1.3.6.1.4.1.5923.1.1.1.6"]) {
        profile.eppn = profile["urn:oid:1.3.6.1.4.1.5923.1.1.1.6"];
      }
      done(null, profile);
    })
  );

  route.get("/test", (req: Request, res: Response) =>
    res.status(200).json({ name: "Jordan Warner" })
  );

  route.post(
    "/login",
    passport.authenticate("saml", {
      failureRedirect: "/login",
      successRedirect: "/",
    })
  );

  route.post(
    "/login/callback",
    passport.authenticate("saml", {
      failureRedirect: "/login",
      successRedirect: "/",
    }),
    async (req: Request, res: Response) => {
      if (process.env.LIMS_CALLBACK) {
        await axios.post(process.env.LIMS_CALLBACK, req.user);
      }

      res.sendStatus(200);
    }
  );
};
