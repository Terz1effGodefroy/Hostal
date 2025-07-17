import express from 'express';
import roomsRouter from './routes/rooms.js';
import bookingsRouter from './routes/bookings.js';

const app = express();
app.use(express.json());

app.use('/rooms', roomsRouter);
app.use('/bookings', bookingsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
