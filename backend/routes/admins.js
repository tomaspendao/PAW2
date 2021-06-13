var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");

//multer
let multer = require("multer");
let DIR = "./uploads/";

router.get("/", adminController.mainPage);

//Promoter/////

router.get("/promoters/",adminController.showAllPromoters);
router.get("/promoters/show/:id", adminController.showPromoter);

router.get("/promoters/create", adminController.createFormPromoter);
router.post("/promoters/create", adminController.createPromoter);

router.post("/promoters/edit/:id", adminController.editPromoter);
router.get("/promoters/edit/:id", adminController.editFormPromoter);

router.get("/promoters/delete/:id", adminController.deletePromoter);

//Events/////

router.get("/events", adminController.showAllEvents);
router.get("/events/show/:id", adminController.showEvent);

router.get("/events/create", adminController.createFormEvent);

//===================================
//MULTER
//===================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = req.body.name + '-' + file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.post("/events/create", upload.single("poster"), (req, res, next) => {
  console.log(req.file);
  adminController.createEvent(req, res, next);
});

router.post("/events/edit/:id", adminController.editEvent);
router.post("/events/edit/:id", upload.single("poster"), (req, res, next) => {
  console.log(req.file);
  adminController.editEvent(req, res, next);
});
//===================================
//MULTER
//===================================

router.get("/events/delete/:id", adminController.deleteEvent);

//Locations/////

router.get("/locations", adminController.showAllLocations);
router.get("/locations/show/:id", adminController.showLocation);

router.get("/locations/create", adminController.createFormLocation);
router.post("/locations/create", adminController.createLocation);

router.post("/locations/edit/:id", adminController.editLocation);
router.get("/locations/edit/:id", adminController.editFormLocation);

router.get("/locations/delete/:id", adminController.deleteLocation);

module.exports = router;
