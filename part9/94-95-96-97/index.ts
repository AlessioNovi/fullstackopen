import express from 'express';
import bmi from './bmi';
import calculate from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full stack');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight as string;
  const height = req.query.height as string;
  const getBmi = bmi(weight, height);
  res.json(getBmi);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises: days, target} = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = calculate({days, target});
  res.json(result);
});

app.listen(3000, () => console.log('Server Running'));