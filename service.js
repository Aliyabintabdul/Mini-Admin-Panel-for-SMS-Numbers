const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Read and parse the CONFIG_JSON environment variable
const rawConfig = process.env.CONFIG_JSON || '{}';
let config;

try {
  config = JSON.parse(rawConfig);
} catch (err) {
  console.error("❌ Failed to parse CONFIG_JSON:", err);
  config = {};
}

const schemaName = config.schemas || 'Unknown';

console.log(`🔧 Loaded schema: ${schemaName}`);

app.get('/', (req, res) => {
  res.send(`Hello ${schemaName}`);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
