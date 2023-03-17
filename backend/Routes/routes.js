const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_CODE = "fdsvdsvdfgvdfsgvdsgvds";
const salt = 10;
const { User } = require("../Schemas/user-schema");
router.post("/signin", async (req, res) => {
  //read a user from db
  //username password
  //user exist or not
  //verify password and generate jwt
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).send("User not exist!");
      } else {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.status(401).send("Invalid Password");
        } else {
          const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET_CODE
          );
          res
            .status(200)
            .send({ message: "User loggedin successsfully", token: token });
        }
      }
    })
    .catch(() => {});
});
router.post("/signup", async (req, res) => {
  //encrypt password
  bcrypt.genSalt(salt, (saltErr, saltValue) => {
    if (saltErr) {
      res.status(401).send("Unable to process");
    } else {
      bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue) => {
        if (hashErr) {
          res.status(401).send("Unable to process");
        } else {
          User.create({
            username: req.body.username,
            password: hashValue,
            email: req.body.email | "",
            mobile: req.body.mobile | "",
          })
            .then((User) => {
              res.status(200).send(`${User.username} created succesfully`);
            })
            .catch((err) => {
              res.status(400).send(err.message);
            });
        }
      });
    }
  });
});
module.exports = router;
