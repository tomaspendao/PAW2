var express = require("express");
var router = express.Router();
var promoterController = require("../controllers/promoterController");

let multer = require("multer");
const authController = require("../controllers/authController");
let DIR = "./uploads/";

router.get(
  "/",
  authController.verifyTokenAdminOrPromoter,
  promoterController.showAll
);
router.get(
  "/show/:id",
  authController.verifyTokenAdminOrPromoter,
  promoterController.show
);
router.post(
  "/create",
  authController.verifyTokenAdmin,
  promoterController.create
);
router.put(
  "/edit/:id",
  authController.verifyTokenAdminOrPromoter,
  promoterController.edit
);
router.delete(
  "/delete/:id",
  authController.verifyTokenAdminOrPromoter,
  promoterController.delete
);

module.exports = router;
