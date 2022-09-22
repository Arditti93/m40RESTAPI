const { Router } = require("express");
const { addUser, login, updateUser, deleteUser, listUsers, findUser } = require("./userControllers");
const { tokenCheck, hashPass } = require("../middleware");
const userRouter = Router();

userRouter.post("/signUp", hashPass, addUser);
userRouter.post("/login", login);
userRouter.get("/displayUsers", tokenCheck, listUsers);
userRouter.get("/findUser", tokenCheck, findUser)
userRouter.put("/updateUser", tokenCheck, updateUser);
userRouter.delete("/user", tokenCheck, deleteUser);

module.exports = userRouter; 
