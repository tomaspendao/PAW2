var express = require("express");
var router = express.Router();
var locationController = require("../controllers/locationController");
var authController = require("../controllers/authController");

router.get("/", locationController.showAll);
router.get("/show/:id", locationController.show);

router.post(
  "/create",
  authController.verifyTokenAdminOrPromoter,
  locationController.create
);
router.put(
  "/edit/:id",
  authController.verifyTokenAdminOrPromoter,
  locationController.edit
);

router.delete(
  "/delete/:id",
  authController.verifyTokenAdminOrPromoter,
  locationController.delete
);

module.exports = router;
