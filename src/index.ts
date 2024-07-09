import express ,{ Request, Response } from 'express';
import router from './routers';

const app = express();
const port = 3000;

app.use('/',router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});