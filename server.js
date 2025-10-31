import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Foody Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});