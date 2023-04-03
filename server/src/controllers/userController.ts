import mongoose from 'mongoose';
import { Request, Response } from 'express';
import UserModel from '../models/User';

export const loginUser = async (req: Request, res: Response) => {
  res.json({mssg: 'login user'});
}