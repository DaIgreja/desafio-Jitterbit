const app = require('./src/app');
require('./src/database/connection');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
