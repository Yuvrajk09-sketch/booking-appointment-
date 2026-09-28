const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const userRoutes = require('./routes/userRoutes');

// Explicitly require models so Sequelize knows about them before syncing
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json()); // Use express.json() instead of body-parser

app.use('/user', userRoutes);

// Sync database and start server (alter: true ensures tables are updated if models change)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log('Database sync error: ', err);
  });
