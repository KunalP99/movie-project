import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string,
  given_name: string,
  name: string,
  picture: string,
  sub: string
}

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  given_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  sub: {
    type: String,
    required: true
  }
}, {timestamps: true});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;