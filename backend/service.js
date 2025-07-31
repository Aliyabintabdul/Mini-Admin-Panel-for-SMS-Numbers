const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/config', (req, res) => {
  const raw = process.env.CONFIG_JSON;
  console.log("CONFIG_JSON:", raw);
  const config = JSON.parse(raw || '{}');

  console.log("apiBaseUrl:", config.apiBaseUrl);
  console.log("tokenExpiration:", config.auth.tokenExpiration);
  console.log("enableAdmin:", config.features?.enableAdmin);
console.log("ENV VALUE:", process.env.MY_ENV_VAR);
console.log("Loaded config:", require('../config.json'));

  res.json(config);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
