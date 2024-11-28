const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());

// Use default middlewares (e.g., logger, static, etc.)
server.use(middlewares);

// Use router
server.use(router);

// Start the server on a specific port
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
