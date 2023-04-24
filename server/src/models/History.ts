import mongoose, { Schema, Document } from "mongoose";

export interface IHistory {
  email: string,
  given_name: string,
  name: string,
  picture: string,
  sub: string
}

export interface HistoryDocument extends IHistory, Document {
  createdAt: Date,
  updatedAt: Date
}

const HistorySchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  movie_id: Number,
  title: String,
  user_rating: Number,
  poster_path: String,
  watch_date: Date,
  rewatch: Boolean,
  points: Number
}, {timestamps: true});

const HistoryModel = mongoose.model<HistoryDocument>('History', HistorySchema);

export default HistoryModel;