import express from 'express';
import { connectToDatabase } from './config/db.config.js';
import router from './routes/app.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const PORT  = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use('/api/', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase();
})