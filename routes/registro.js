var express = require('express');
var router = express.Router();
let userRouter = require("../controller/userController")
const multer = require ('multer');
const path = require ('path');
const {body} = require("express-validator")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/users'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

const validation = [
  body("name").notEmpty().withMessage("Tienes que escribir un nombre"),
  body("userName").notEmpty().withMessage("Tienes que escribir un apellido"),
  body("email").notEmpty().withMessage("Tienes que escribir un email"),
  body("textDirection").notEmpty().withMessage("Tienes que escribir una direccion"),
  body("password").notEmpty().withMessage("Tienes que escribir una repassword"),
  body("repassword").notEmpty().withMessage("Tiene que coincidir la repassword")
]


router.get("/", userRouter.index)

router.post("/", upload.single('picture'), validation, userRouter.store)

module.exports = router;
