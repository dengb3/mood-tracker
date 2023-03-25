
import express from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';

import { UserModel } from '../models/users.js';
export const usersRouter = express.Router();

usersRouter.post('/create', async (req, res) => {
  const newUser = new UserModel({
    userName: req.body.userName,
    password: req.body.password,
  });

  try {
    let existingUser = await UserModel.findOne({
      userName: newUser.userName,
    });

    if (existingUser) {
      return res.status(400).json({
        msg: 'User Already Exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password.toString(), salt);
    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      'randomString',
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(403).json({
      error: error.message,
    });
  }
});


usersRouter.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: 'User Not Exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password !' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      'randomString',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      },
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});




usersRouter.get('/me', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error in Fetching user' });
  }
});
 

  usersRouter.delete('/del/:userName', async (req, res, next) => {
    await UserModel.deleteOne({userName: req.params.userName}).then(
      () => {
        res.status(200).json({
          message: `user has been deleted!`
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });