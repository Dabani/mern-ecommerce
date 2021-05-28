const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

// Environment variable or you can say constants
env.config();

// Connect to MongoDB database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@onlinedatingapp.m6dxp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
{ 
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log('Database connected')
})
.catch((err) => {
  console.log(err);
});

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
