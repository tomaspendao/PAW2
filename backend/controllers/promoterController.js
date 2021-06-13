/**
 * Controller dos Promoters, que podem criar/editar/eliminar eventos
 */

var mongoose = require("mongoose");
var Promoter = require("../models/user");
const { register } = require("./authController");

var promoterController = {};

//mostrar todos os promotores
promoterController.showAll = function (req, res, next) {
  Promoter.find({role: "PROMOTER"}).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      console.log(dbitems);
      res.json(dbitems);
    }
  });
};
//mostrar um promotor em especifico
promoterController.show = function (req, res, next) {
  Promoter.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(dbitem)
    }
  });
};

//criar um promotor (POST)
promoterController.create = function (req, res, next) {
  var promoter = new Promoter(req.body);
  promoter.role = "PROMOTER";
  //register(req.body.name,req.body.email,"password","PROMOTER");

  promoter.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(promoter);
    }
  })
};

//editar um promotor (POST)
promoterController.edit = function (req, res,next) {
  Promoter.findByIdAndUpdate(req.body._id, req.body, (err, editedPromoter) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(editedPromoter)
    }
  });
};
//apagar um promotor (não aplicavel)
promoterController.delete = function (req, res, next) {
  Promoter.deleteOne({ _id: req.params.id }).exec((err, deletedPromoter) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(deletedPromoter);
    }
  });
};


promoterController.uploadFile = (req, res, next) => {};

module.exports = promoterController;
