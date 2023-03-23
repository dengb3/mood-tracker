import express from 'express';
import { UserModel } from '../models/users.js'
export const usersRouter = express.Router();


usersRouter.post('/create', async (req, res) => {

  const user = new UserModel({
    user_name: req.body.user_name,
    password: req.body.password,
  });
  try {
  await user.save();
  res.status(201).json({
    message: 'user added successfully!'
  });
  } catch (error) {
  console.error(error);
  res.status(400).json({
    error: error.message
    });
  }

return usersRouter;

});

  // usersRouter.get('/view', (req, res, next) => {
  //   UserModel.find().then(
  //     (users) => {
  //       res.status(200).json(users);
  //     }
  //   ).catch(
  //     (error) => {
  //       res.status(400).json({
  //         error: error
  //       });
  //     }
  //   );
  // });

  // usersRouter.put('/update/:id', async (req, res, next) => {
  //   const user = new UserModel({
  //     _id: req.params.id,
  //     user_name: req.body.user_name,
  //     password: req.body.password,

  //   });
  //   await UserModel.updateOne({_id: req.params.id}, user).then(
  //     () => {
  //       res.status(201).json({
  //         message: 'User updated successfully!'
  //       });
  //     }
  //   ).catch(
  //     (error) => {
  //       res.status(400).json({
  //         error: error
  //       });
  //     }
  //   );
  // });

  // usersRouter.delete('/del/:id', async (req, res, next) => {
  //   await UserModel.deleteOne({_id: req.params.id}).then(
  //     () => {
  //       res.status(200).json({
  //         message: "User has been deleted!"
  //       });
  //     }
  //   ).catch(
  //     (error) => {
  //       res.status(400).json({
  //         error: error
  //       });
  //     }
  //   );
  // });