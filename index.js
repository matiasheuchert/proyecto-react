// import packages
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const morgan   = require('morgan');
const path     = require('path');

// config vars
const port = process.env.PORT        || 4000;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/notas';

// crear app
const app = express();

// conexion a la base de datos
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
  .catch(err => console.error(`Connection error ${err}`));

// serve React frontend

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/:route', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/handball/equipos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/basquet/equipos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// middleware
// parsear bodys con json
app.use(express.json());
// usar cors
app.use(cors());
// logger para desarrollo
app.use(morgan('dev'));
// api router
app.use('/api/handball', require('./api/routes/handballTeams'));
app.use('/api/basquet', require('./api/routes/basquetTeams'));

// error handlers (despues de las rutas de la API)
// 404 not found
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
// algun error distinto a not found
// defaultea a 500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  // DEBUG: console.error(err.stack)
  res.json({ error: err.message });
});

// listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});