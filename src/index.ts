import express from 'express';
import { connect } from 'mongoose';
import daysRouter from './routers/days';
import eventsRouter from './routers/event';
import cors from 'cors'; 

//localhost - from localmachine
//db - from docker
connect('mongodb://magnus:hunter2@mongo:27017/', {dbName: 'Calendar'})
.then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.log(error.message);
  });
//mongodb://magnus:hunter2@localhost:27017/?authMechanism=DEFAULT


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/days', daysRouter);
app.use('/api/events', eventsRouter);

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pongg');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});