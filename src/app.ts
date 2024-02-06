import "dotenv/config";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

import router from "./routes";
import * as auth from "./utils/auth";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(session(auth.sessionConfig));

passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    cb(null, { userId: user.user_id });
  });
});

passport.deserializeUser(function (user: any, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/", auth.checkAuthenticated, router);

export default app;
