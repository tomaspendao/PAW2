var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

let multer = require("multer");
const authController = require("../controllers/authController");
let DIR = "./uploads/";

router.get(
  "/",
  userController.showAll
);

router.get(
  "/showtickets/:id",
  userController.showAllTickets
);

router.post(
  "/addTicket",
  authController.verifyTokenUser,
  userController.addTicket
);

router.delete(
  "/deleteticket/:id",
  userController.deleteTicket
);

router.get(
  "/show/:id",
  userController.show
);
router.post(
  "/create",
  userController.create
);
router.put(
  "/edit/:id",
  //ser ele próprio
  userController.edit
);
router.delete(
  "/delete/:id",
  //ser ele proprio
  userController.delete
);

module.exports = router;
