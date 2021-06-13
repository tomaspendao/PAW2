/**
 * Controller dos Users, que podem
 */

var mongoose = require("mongoose");
var User = require("../models/user");
var Tickets = require("../models/ticket");
const { register } = require("./authController");

var userController = {};

//mostrar todos os users
userController.showAll = function (req, res, next) {
  User.find({ role: "USER" }).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      console.log(dbitems);
      res.json(dbitems);
    }
  });
};

userController.showAllTickets = function (req, res, next) {
  Tickets.find({ userId: req.params.id }).populate("eventId").exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      console.log(dbitems);
      res.json(dbitems);
    }
  });
};

userController.addTicket = function (req, res, next) {
  console.log(req.body);
  var ticket = new Tickets();

  var url =
    req.protocol +
    "://" +
    req.get("host") +
    "/uploads/CovidTests/" +
    req.body.file;

  ticket.eventId = req.body.eventId;
  ticket.userId = req.body.userId;
  ticket.file = url;

  console.log(ticket);

  ticket.save((err) => {
    if(err){
      next(err);
    } else {
      res.json(ticket);
    }
  })

};

userController.deleteTicket = function (req, res, next) {
  Tickets.deleteOne({ _id: req.params.id }).exec((err, deletedTicket) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(deletedTicket);
    }
  });
};

//mostrar um user em especifico
userController.show = function (req, res, next) {
  User.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(dbitem);
    }
  });
};

//criar um user (POST)
userController.create = function (req, res, next) {
  var user = new User(req.body);
  user.role = "USER";
  //register(req.body.name,req.body.email,"password","PROMOTER");

  promoter.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(promoter);
    }
  });
};

//editar um user (POST)
userController.edit = function (req, res, next) {
  User.findByIdAndUpdate(req.body._id, req.body, (err, editedPromoter) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(editedPromoter);
    }
  });
};
//apagar um user
userController.delete = async function (req, res, next) {
  try {
    const result = await Tickets.find({userId: req.params.id});

    if(result.length>0){
      Tickets.deleteMany({ userId: req.params.id }).exec((err) => {
        if (err) {
          next(err);
        }
      });
    } else {
      console.log("erro");
    }

    User.deleteOne({ _id: req.params.id }).exec((err, deletedUser) => {
      if (err) {
        next(err);
      } else {
        res.json(deletedUser);
      }
    });

  } catch (error) {
    console.log("erro");
  }
};

module.exports = userController;
