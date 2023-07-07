const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);

const port = 3001; // Ganti dengan port yang Anda inginkan
server.listen(port, () => {
  console.log(`JSON Server berjalan pada port ${port}`);
});