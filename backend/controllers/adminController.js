/**
 * Controller dos admins que podem criar/editar/remover eventos/localizações/promotores
 */

var mongoose = require("mongoose");
var Promoter = require("../models/user");
var Event = require("../models/event");
var Location = require("../models/location");

var adminController = {};

//criar a main page do admin
adminController.mainPage = function (req, res) {
  console.log("controller1");
  res.render("admin/admin");
};

/*
Event.remove({}, function(err) { 
  console.log('collection removed') 
});*/

//SHOW ALL
//promoter
adminController.showAllPromoters = function (req, res) {
  Promoter.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      console.log(dbitems);
      res.render("admin/promoters/promoterList", { items: dbitems });
    }
  });
};
//event
adminController.showAllEvents = function (req, res) {
  Event.find({})
    .populate("location")
    .exec((err, dbitems) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        console.log(dbitems);
        res.render("admin/events/eventList", { items: dbitems });
      }
    });
};
//location
adminController.showAllLocations = function (req, res) {
  Location.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      console.log(dbitems);
      res.render("admin/locations/locationList", { items: dbitems });
    }
  });
};
//SHOW ONE
//promoter
adminController.showPromoter = function (req, res) {
  Promoter.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("admin/promoters/promoterDetails", { item: dbitem });
    }
  });
};
//event
adminController.showEvent = function (req, res) {
  Event.findOne({ _id: req.params.id })
    .populate("location")
    .exec((err, dbitem) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        res.render("admin/events/eventDetails", { item: dbitem });
      }
    });
};
//location
adminController.showLocation = function (req, res) {
  Location.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("admin/locations/locationDetails", { item: dbitem });
    }
  });
};
// CREATE 1 (FORM GET)
//promoter
adminController.createFormPromoter = function (req, res) {
  console.log("controller1");
  res.render("admin/promoters/createPromoter");
};
//event
adminController.createFormEvent = function (req, res) {
  Location.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      console.log(dbitems);
      res.render("admin/events/createEvent", { items: dbitems });
    }
  });
};
//location
adminController.createFormLocation = function (req, res) {
  console.log("controller1");
  res.render("admin/locations/createLocation");
};
// CREATE PROMOTER (POST)
//promoter
adminController.createPromoter = function (req, res) {
  var promoter = new Promoter(req.body);
  promoter.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/admins/promoters");
    }
  });
};
//event
adminController.createEvent = function (req, res, next) {
  //obter path do uploads
  console.log(req.file.filename);
  const url =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  Event.create(
    {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      poster: url,
    },
    (err) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.redirect("/promoters/events");
      }
    }
  );
};

//location
adminController.createLocation = function (req, res) {
  var location = new Location(req.body);
  location.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/admins/locations");
    }
  });
};
//EDITAR 1 (FORM GET)
//promoter
adminController.editFormPromoter = function (req, res) {
  Promoter.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("admin/promoters/promoterEdit", { item: dbitem });
    }
  });
};
//event
adminController.editFormEvent = function (req, res) {
  Event.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("admin/events/eventEdit", { item: dbitem });
    }
  });
};
//location
adminController.editFormLocation = function (req, res) {
  Location.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("admin/locations/locationEdit", { item: dbitem });
    }
  });
};
// EDITAR 1 (POST)
//promoter
adminController.editPromoter = function (req, res) {
  Promoter.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/admins/promoters/show/" + req.body._id);
    }
  });
};
//event
adminController.editEvent = function (req, res, next) {
  if (typeof req.file !== "undefined") {
    const url =
      req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    //com poster
    Event.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        description: req.body.description,
        poster: url,
      },
      (err) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          res.redirect("/promoters/events/show/" + req.body._id);
        }
      }
    );
    //sem poster
  } else {
    Event.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      (err) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          res.redirect("/promoters/events/show/" + req.body._id);
        }
      }
    );
  }
};
//location
adminController.editLocation = function (req, res) {
  Location.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/admins/locations/show/" + req.body._id);
    }
  });
};
// DELETE 1
//promoter
adminController.deletePromoter = function (req, res) {
  Promoter.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.redirect("/admins/promoters");
    }
  });
};
//event
adminController.deleteEvent = function (req, res) {
  Event.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.redirect("/admins/events");
    }
  });
};
//location
adminController.deleteLocation = async function (req, res) {
  try {
    const result = await Event.find({ location: req.params.id });

    if (result.length > 0) {
      //res.redirect("/index/error/409");
      res.status(409).json({ message: "409" });
    } else {
      Location.remove({ _id: req.params.id }).exec((err) => {
        if (err) {
          console.log("Erro a ler");
          res.redirect("/error");
        } else {
          res.redirect("/locations");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

adminController.uploadFile = (req, res, next) => {};

module.exports = adminController;
