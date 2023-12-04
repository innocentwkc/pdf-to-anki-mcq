// index.js
import express from 'express';
import cors from 'cors';
// import multer from 'multer';
// import tcpPingRouter from './routes/tcpPingRouter.js';
import upload from './routes/upload.js';

/**
 * Creates an Express application and sets up a route for performing TCP pings.
 */
const app = express();
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// Use the routers
// app.use('/tcp-ping', tcpPingRouter);
app.use('/api', upload); // upload route

// Server configuration
const port = 4006;

/**
 * Starts the server on the specified port.
 */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
