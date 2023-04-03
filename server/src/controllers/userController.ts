import mongoose from 'mongoose';
import { Request, Response } from 'express';
import UserModel, { UserDocument } from '../models/User';

// Add user to database only if they are not already in it
export const signUpUser = async (req: Request, res: Response) => {
  const {email, given_name, name, picture, sub}: 
  { email: string, given_name: string, name: string, picture: string, sub: string } = req.body

  // Find if the the user trying to log in to website is already in the database using the sub property
  const result = await UserModel.findOne({sub: sub}).select('sub').lean();

  try {
    if (!result) {
      const newUser = new UserModel({
        email,
        given_name,
        name,
        picture,
        sub
      });
      
      const createdUser = await newUser.save();
      res.status(200).json(createdUser);
    }
  }  catch (err) {
    res.status(400).json('Account already in database');
  }
}