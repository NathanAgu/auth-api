require('dotenv').config();
const express = require('express');
const database = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', userRoutes);

database.sync()
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });