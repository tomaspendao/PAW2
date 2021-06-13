var express = require("express");
const authController = require("../controllers/authController");
var router = express.Router();
var eventController = require("../controllers/eventController");
var locationController = require("../controllers/locationController");

//multer
let multer = require("multer");
let DIR = "../uploads";

router.get("/", eventController.showAll);
router.get("/show/:id", eventController.show);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName =
      req.body.name +
      "-" +
      file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,
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
router.post(
  "/create",
  upload.single('poster'),
  (req, res, next) => {
    eventController.create(req, res, next);
  },
  authController.verifyTokenAdminOrPromoter,
  eventController.create
);

router.get('/file', function(req, res) {
  res.render('fileForm');
});

router.post('/file_upload', function(req, res) {
  console.log(req.file);
  eventController.getSingleFile(req,res);
});

router.post('/file_upload_test', function(req, res) {
  console.log(req.file);
  eventController.getSingleFileTest(req,res);
});

router.put(
  "/edit/:id",
  upload.single("poster"),
  (req, res, next) => {
    console.log(req.file);
    eventController.edit(req, res, next);
  },
  authController.verifyTokenAdminOrPromoter,
  eventController.edit
);

router.delete(
  "/delete/:id",
  authController.verifyTokenAdminOrPromoter,
  eventController.delete
);

module.exports = router;
