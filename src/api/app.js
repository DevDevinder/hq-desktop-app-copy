import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import dispatchRoutes from './routes/dispatchRoutes.js';
import ambulanceRoutes from './routes/ambulanceRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import callHandlingRoutes from './routes/callHandlingRoutes.js';
import realTimeRoutes from './routes/realTimeRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/api/patients', patientRoutes);
app.use('/api/dispatches', dispatchRoutes);
app.use('/api/ambulances', ambulanceRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/call-handling', callHandlingRoutes);
app.use('/api/real-time', realTimeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
