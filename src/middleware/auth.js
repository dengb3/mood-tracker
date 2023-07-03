import jwt from 'jsonwebtoken';
import { UserModel } from '../models/users.js';

export const auth = async (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("token")


  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'randomString');
    req.user = decoded.user;

    // Find user in database
    const user = await UserModel.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Set user data in request object
    req.user = user;

    // Call next middleware
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
