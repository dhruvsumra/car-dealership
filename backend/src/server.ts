import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Aura Motors API backend listening on port ${PORT}`);
});
