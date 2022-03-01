const express= require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/register", authController.signUp);
// router.post("/login", authController.signIn);
// router.get("/logout", authController.logout);


router.get("/",userController.getAllUsers)
router.get("/:id",userController.userInfo)
router.put("/:id",userController.updateUser)
router.delete('/:id',userController.delteUser)

module.exports = router;
