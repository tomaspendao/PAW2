/**
 * Controller das Localizações, que podem mostrar as localizações
 */

var mongoose = require("mongoose");
var Location = require("../models/location");
var Event = require("../models/event");

var locationController = {};

//mostrar todas as localizações
locationController.showAll = function (req, res, next) {
  Location.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      console.log(dbitems);
      res.json(dbitems);
    }
  });
};
//mostrar uma localização especifica
locationController.show = function (req, res, next) {
  Location.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(dbitem);
    }
  });
};

// criar 1 localização (FORM GET)(não aplicavel)
/*locationController.createForm = function (req, res) {
  res.render("location/createLocation");
};*/
// criar uma localização (POST)(não aplicavel)
locationController.create = function (req, res, next) {
  if(req.body.limit>100 || req.body.limit<0){
    console.log("Between 0 and 100 please!");
    next();
  }
  var location = new Location(req.body);
  location.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(location);
    }
  });
};
// editar 1 localização (FORM GET)(não aplicavel)
/*locationController.editForm = function (req, res) {
  Location.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("location/locationEdit", { item: dbitem });
    }
  });
};*/
// editar uma localização (POST)(não aplicavel)
locationController.edit = function (req, res, next) {
  Location.findByIdAndUpdate(req.body._id, req.body, (err, editedLocation) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(editedLocation);
    }
  });
};
//apagar uma localização 
locationController.delete = async function (req, res, next) {
  try {
    const result = await Event.find({ location: req.params.id });

    if (result.length > 0) {
      //res.redirect("/index/error/409");
      //res.status(409).json({ message: "409" });
      next(err);
    } else {
      Location.deleteOne({ _id: req.params.id }).exec((err, deletedLocation) => {
        if (err) {
          next(err);
        } else {
          res.json(deletedLocation);
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = locationController;
