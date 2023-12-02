import express from 'express';
import cors from 'cors';

import diagnosesRoutes from './routes/diagnoses';
import patientRoutes from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('Pongs');
});

app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/patients', patientRoutes);

app.listen(3001, () => console.log('Server Running'));

