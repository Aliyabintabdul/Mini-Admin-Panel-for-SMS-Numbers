app.get("/config", (req, res) => {
  const raw = process.env.CONFIG_JSON;
  console.log("CONFIG_JSON:", raw);
  const config = JSON.parse(raw || '{}');

  console.log("apiBaseUrl:", config.apiBaseUrl);
  console.log("tokenExpiration:", config.auth.tokenExpiration);
  console.log("enableAdmin:", config.features.enableAdmin);

  res.json(config); // optional
});

// ✅ Add this AFTER all routes are defined:
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
