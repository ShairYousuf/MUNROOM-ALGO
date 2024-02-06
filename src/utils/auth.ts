import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import { StatusCodes } from "http-status-codes";

const host = process.env.MONGODB_HOST;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const connectionString = `mongodb+srv://${username}:${password}@${host}/dev?retryWrites=true&w=majority`;
const mongooseConnect = mongoose.connect(connectionString);

async function getMongoClient(mongooseConnect: any): Promise<any> {
  return mongooseConnect.then(function () {
    return mongoose.connection.getClient();
  });
}

const secret = process.env.DB_SESSION_SECRET;
if (!secret) throw Error("Missing secret environment variable");

const sessionConfig: session.SessionOptions = {
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: false,
    maxAge: 7776000000,
    secure: false
  },
  store: MongoStore.create({
    clientPromise: getMongoClient(mongooseConnect),
    autoRemove: "disabled",
    serialize: (user: any) => {
      return user;
    }
  })
};

function checkAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) next();
  else res.sendStatus(StatusCodes.UNAUTHORIZED);
}

export { sessionConfig, checkAuthenticated };
