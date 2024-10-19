const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const authRoutes = require('./routes/authRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Authentication routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// Server setup
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
