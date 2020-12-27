const port = process.env.PORT || 3001;
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const namesRouter = require('./controllers/namesRouter');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api/names', namesRouter);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app;