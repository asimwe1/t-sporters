import express from 'express';
import { connectToDatabase } from './config/db.config.js';
import router from './routes/app.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'

const app = express();

const PORT  = 5000;

const __dirname = path.resolve()

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use('/api/', router);

app.use(express.static(path.join(__dirname, '/frontend/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase();
})