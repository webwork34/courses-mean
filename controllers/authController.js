const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {SECRET} = require('./../config/config');

const User = require('./../models/userModel');

module.exports.login = async (req, res) => {
  const {email, password} = req.body;
  const candidate = await User.findOne({email});

  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password);

    if (passwordResult) {
      const objUser = {
        email: candidate.email,
        userId: candidate._id,
        name: candidate.name,
      };

      // const token = jwt.sign(objUser, SECRET, {expiresIn: '24h'});
      const token = jwt.sign(objUser, SECRET, {expiresIn: '1h'});

      res.status(200).json({
        jwt_token: `Bearer ${token}`,
      });
    } else {
      return res
        .status(401)
        .json({message: `Passwords didn't match. Check and try again.`});
    }
  } else {
    return res.status(404).json({message: `User hasn't found.`});
  }
};

module.exports.registration = async (req, res) => {
  const {name, email, password} = req.body;
  const candidate = await User.findOne({email});

  if (!candidate) {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email,
      password: bcrypt.hashSync(password, salt),
      name,
    });

    try {
      await user.save();

      return res.status(201).json({message: 'Profile created successfully'});
    } catch (err) {
      return res.status(500).json({message: err.message ? err.message : err});
    }
  } else {
    return res
      .status(409)
      .json({message: `User with email - ${email} has already exist.`});
  }
};
