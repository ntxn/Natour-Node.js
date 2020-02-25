const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log(process.env.NODE_ENV);
    console.log(connection.connections);
    console.log('DB connection successful');
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
