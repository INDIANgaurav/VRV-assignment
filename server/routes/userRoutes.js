const express = require('express');
const { login, signup, getAllUsers, updateUserStatus, updateUserRole, addUser, updateUser } = require('../controllers/userController');
const router = express.Router();

const {authenticateToken} = require('../middleware/authToken')
router.post("/login"  , login)
router.post("/signup"  , signup)
router.post("/adduser"  , addUser)
router.get("/getallusers" ,authenticateToken ,getAllUsers)
router.put("/updatestatus/:id",authenticateToken, updateUserStatus);
router.put("/updaterole/:id", authenticateToken, updateUserRole);
router.put("/updateuser/:id", authenticateToken, updateUser);




module.exports = router; 