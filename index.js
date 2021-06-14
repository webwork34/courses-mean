const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoute = require('./routes/authRoute');
const coursesRoute = require('./routes/coursesRoute');
const {MONGO_URI} = require('./config/config');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api', authRoute);
app.use('/api', coursesRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/courses-app'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'dist', 'courses-app', 'index.html')
    );
  });
}

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
);
