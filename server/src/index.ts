import * as dotenv from 'dotenv';
dotenv.config();
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';

// Create express app
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('test');
});

// Connect to database and then start up server
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
