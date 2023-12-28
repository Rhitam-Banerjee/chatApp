const {
  login,
  register,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");
const router = require("express").Router();
router.post("/login", login);
router.post("/register", register);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);
module.exports = router;
