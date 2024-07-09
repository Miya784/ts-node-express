import express ,{ Request, Response } from 'express';
import router from './routers';
import { sync } from './models/index.model';

const app = express();
const port = 3000;

app.use('/',router);

sync({}).then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
  });
});