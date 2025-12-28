import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/articles', (res) => {
  return res.status(200);
});

export default app;
