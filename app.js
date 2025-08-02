 
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');
const movieRoutes = require('./routes/movies');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/movies', movieRoutes);

// DB sync and start server
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(err => console.error('DB sync error:', err));
