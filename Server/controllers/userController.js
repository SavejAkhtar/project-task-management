const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = (req, res) => {

    let {name,email,password} = req.body;

    bcrypt.hash(password, 10).then((hashedPassword) => {

        let data = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
     data.save().then(() => {
            res.send({status: 1,msg: "User registered successfully"});
    })
    .catch((err) => {res.send({status: 0,msg: "User not registered",error: err});
    });

    });
};

const loginUser = (req, res) => {

    let { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {

        if (!user) {
            return res.send({
                status: 0,
                msg: "User not found"
            });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {

            if (!isMatch) {
                return res.send({status: 0,msg: "Invalid password"});
            }

         let token = jwt.sign(
            {
              id: user._id,
              role: user.role
            },
            process.env.JWT_SECRET,
            {
                  expiresIn: "1d"
            }   
          );   

            res.send({status: 1,msg: "Login successful",token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        });

    }).catch((err) => {
        res.send({status: 0,msg: "Login failed",error: err});
    });
};

const getTeamMembers = (req, res) => {

    User.find({ role: "teamMember" }).select("-password")
    .then((users) => {

        res.send({status: 1,msg: "Team members get successfully",data: users
        });

    })
    .catch((err) => {

        res.send({status: 0,msg: "Team members not get",error: err});

    });
};

module.exports ={registerUser,loginUser,getTeamMembers};