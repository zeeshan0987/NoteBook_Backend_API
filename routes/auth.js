const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// Create a User using : POST "/api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter A valid PassWord").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "Sorry a user with this email already exists" });
      }
      // Creat a nuw User
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      res.json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
