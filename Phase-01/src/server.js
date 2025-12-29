import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDb from './config/db.js';

const PORT = process.env.PORT;

connectDb();

app.listen(PORT, () => {
  console.log('Server is running on PORT :', PORT);
});
