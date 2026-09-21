const express = require("express");
const { registerUser, loginUser, getTeamMembers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login",loginUser)

userRouter.get("/profile",authMiddleware, (req,res)=>{
    res.send({status:1,msg:"Protected profile",user:req.user});
});

userRouter.get("/admin-profile",authMiddleware, roleMiddleware(["admin"]), (req, res) => {
        
        res.send({status: 1,msg: "Admin profile",user:req.user
        });

    }
);
userRouter.get("/team-members",authMiddleware,roleMiddleware(["admin","projectManager"]),getTeamMembers)

module.exports ={userRouter};