/**
 * Controller dos Eventos, que podem mostrar os eventos
 */

var mongoose = require("mongoose");
var Event = require("../models/event");
var Ticket = require("../models/ticket");
//var Location = require("../models/location");

var path = require("path");
var fs = require("fs");

var eventController = {};

//mostrar todos os eventos
eventController.showAll = function (req, res, next) {
  Event.find({})
    .populate("location")
    .exec((err, dbitems) => {
      if (err) {
        console.log("Erro a ler");
        next(err);
      } else {
        console.log(dbitems);
        res.json(dbitems);
      }
    });
};
//mostrar um evento eme specifico
eventController.show = function (req, res, next) {
  Event.findOne({ _id: req.params.id })
    .populate("location")
    .exec((err, dbitem) => {
      if (err) {
        console.log("Erro a ler");
        next(err);
      } else {
        res.json(dbitem);
      }
    });
};

//criar um evento (POST) (não aplicavel)
eventController.create = function (req, res, next) {
  console.log("poster: " + req.body.poster);
  console.log("price: " + req.body.price);
  var url =
    req.protocol +
    "://" +
    req.get("host") +
    "/uploads/" +
    req.body.poster.substring(12);
  console.log(url);
  Event.create(
    {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      poster: url,
    },
    (err) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json();
      }
    }
  );
};

//editar um evento (PUT)
eventController.edit = function (req, res, next) {
  //if (typeof req.body.url !== "undefined") {
  var url =
    req.protocol +
    "://" +
    req.get("host") +
    "/uploads/" +
    req.body.poster.substring(12);
  //com poster
  Event.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      poster: url,
    },
    (err, editedEvent) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(editedEvent);
      }
    }
  );
  //sem poster
  /*} else {
    Event.findByIdAndUpdate(req.body._id, req.body, (err, editedEvent) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(editedEvent);
      }
    });
  }*/
};
//apagar um evento (DELETE)
eventController.delete = async function (req, res, next) {
  try {
    const result = await Ticket.find({eventId: req.params.id});

    if(result.length>0){
      Ticket.deleteMany({ eventId: req.params.id }).exec((err) => {
        if (err) {
          next(err);
        }
      });
    } else {
      next(err);
    }

    Event.deleteOne({ _id: req.params.id }).exec((err, deletedEvent) => {
      if (err) {
        next(err);
      } else {
        res.json(deletedEvent);
      }
    });

  } catch (error) {
    next(error)
  }

};

eventController.getSingleFile = function (req, res, next) {
  console.log(req.file);
  let response = {};
  var fileDestination = path.join(
    __dirname,
    "..",
    "uploads",
    req.file.filename
  );

  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(fileDestination, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.file.name,
        };
      }
      res.end(JSON.stringify(response));
    });
  });
};

eventController.getSingleFileTest = function (req, res, next) {
  console.log(req.file);
  let response = {};
  var fileDestination = path.join(
    __dirname,
    "..",
    "uploads","CovidTests",
    req.file.filename
  );

  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(fileDestination, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.file.name,
        };
      }
      res.end(JSON.stringify(response));
    });
  });
};

//eventController.uploadFile = (req, res, next) => {};

module.exports = eventController;
