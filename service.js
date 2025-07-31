const express = require('express');
const config = require('./config.json');

const app = express();
const port = process.env.PORT || 3000;

const schemaName = config.schemas;

console.log(`🔧 Loaded schema: ${schemaName}`);

app.get('/', (req, res) => {
  res.send(`Hello ${schemaName}`);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
