const express = require("express");


module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
