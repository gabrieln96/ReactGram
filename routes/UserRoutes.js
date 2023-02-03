const express = require("express")
const router = express.Router()
 
// Controller
const { register, login, getCurrentUser, update, } = require("../controllers/UserController")
const authGuard = require("../middlewares/authGuard")
 
// Middlewares
const validate = require("../middlewares/handleValidation")
const { imageUpload } = require("../middlewares/imageUpload")
const {userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations")

// Routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser )
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)
 
module.exports = router