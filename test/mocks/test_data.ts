"use strict";

export default {
  correctUserData: {
    email: "test@mun.ca",
    password: "password@123"
  },
  incorrectEmailUserData: {
    email: "test--@man.ca",
    password: "password"
  },
  incorrectPasswordUserData: {
    email: "test@mun.ca",
    password: "passIncorrect"
  }
};
