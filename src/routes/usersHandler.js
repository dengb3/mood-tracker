import express from 'express';
import { UserModel } from '../models/users.js'
export const usersRouter = express.Router();

// Connect to the database
const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log())
  .catch(err => console.log(err));

usersRouter.post('/create', async (req, res, next) => {
    const user = new UserModel({
      user_name: req.body.user_name,
      password: req.body.password,

    });
    await user.save().then(
      () => {
        res.status(201).json({
          message: 'User added successfully!'
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

  usersRouter.get('/view', (req, res, next) => {
    UserModel.find().then(
      (users) => {
        res.status(200).json(users);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  usersRouter.put('/update/:id', async (req, res, next) => {
    const user = new UserModel({
      _id: req.params.id,
      user_name: req.body.user_name,
      password: req.body.password,

    });
    await UserModel.updateOne({_id: req.params.id}, user).then(
      () => {
        res.status(201).json({
          message: 'User updated successfully!'
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

  usersRouter.delete('/del/:id', async (req, res, next) => {
    await UserModel.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: "User has been deleted!"
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