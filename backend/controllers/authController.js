const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../jwt_secret/config");
var mongoose = require("mongoose");
var user = require("../models/user");

var authController = {};
var role;

authController.login = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });
};

authController.register = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password);

  /*if (req.body.role !== "USER") {
    if (req.body.role !== "PROMOTER") {
      if (req.body.role !== "ADMIN") {
        console.log("não");
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.role);
        req.body.role = "USER";
      }
    }
  }*/
  console.log(req.body.role);
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    },
    function (err, user) {
      if (err) return res.status(500).json(err);

      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    }
  );
};

authController.verifyToken = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

authController.verifyTokenPromoter = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //confirmar o role de Promoter
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role !== "PROMOTER") {
          return res.status(500).send({ auth: false, message: "Not Promoter" });
        }
        req.userId = decoded.id;
        next();
      }
    });
  });
};

authController.verifyTokenAdmin = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  console.log(req.params.id);

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //confirmar Admin role
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role !== "ADMIN") {
          return res.status(500).send({ auth: false, message: "Not Admin" });
        }
        req.userId = decoded.id;
        next();
      }
    });
  });
};

authController.verifyTokenUser = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  console.log(req.params.id);

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //confirmar User role
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role !== "USER") {
          return res.status(500).send({ auth: false, message: "Not User" });
        }
        req.userId = decoded.id;
        next();
      }
    });
  });
};

authController.verifyTokenAdminOrPromoter = function (req,res,next) {
  var token = req.headers["x-access-token"];
  console.log(req.params.id);

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //confirmar Admin role
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role === "ADMIN") {
          return authController.verifyTokenAdmin(req,res,next);
        } else if (dbitem.role === "PROMOTER") {
          return authController.verifyTokenPromoter(req,res,next);
        } else {
          return res.status(500).send({ auth: false, message: "Not Promoter Or Admin" });
        }
        req.userId = decoded.id;
        next();
      }
    });
  });
};

module.exports = authController;
