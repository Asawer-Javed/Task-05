const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('../../utils/bcrypt');

router.post('/register', async (req , res) => {
  try {
    const role = await Role.findOne({ name: 'user' });
    if (!role) {
      return res.status(400).send({ message: 'Role not found' });
    }
    const user = new User({
      email: req.body.email,
      password: await bcrypt.hashPassword(req.body.password),
      role: role._id
    });
    await user.save();
    res.status(201).send({ message: 'User  created successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating user' });
  }
});
