const { login, register, getUserDetailInfo, updateUserProfile, updateUserPassword, getAllUsers, getSingleUser, deleteuser, updateuser, forgetPassword, resetPassword, logout } = require("../controllers/authcontroller");

const express = require("express");
const AuthUser = require("../middlerware/AuthUser");
const AuthorizeRole = require("../middlerware/AuthorizeRole");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);


router.get("/me", AuthUser, getUserDetailInfo);
router.put("/updatePassword", AuthUser, updateUserPassword);
router.put("/updateProfile", AuthUser, updateUserProfile);

router.get("/admin/users", AuthUser,AuthorizeRole("admin"), getAllUsers)
router.route("/admin/users/:id").get(AuthUser, AuthorizeRole("admin"), getSingleUser)
    .put(AuthUser, AuthorizeRole("admin"), updateuser).delete(AuthUser, AuthorizeRole("admin"), deleteuser)

router.post('/password/forget',AuthUser,forgetPassword);
router.put('/password/reset/:token',resetPassword)


module.exports = router