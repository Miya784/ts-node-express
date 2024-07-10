import express ,{ Request, Response } from 'express';
import router from './routers';
import { sync } from './models/index.model';
import * as swaggerUi from "swagger-ui-express";
import * as fs from "fs";

const app = express();
const port = 3000;

// swagger docs
if (process.env.NODE_ENV != "production") {
  const swaggerFile: any = process.cwd() + "/src/swagger/swagger.json";
  const swaggerData: any = fs.readFileSync(swaggerFile, "utf8");
  const customCss: any = fs.readFileSync(process.cwd() + "/src/swagger/swagger.css", "utf8");
  const swaggerDocument = JSON.parse(swaggerData);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, undefined, undefined, customCss));
}

app.use('/',router);

sync({}).then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
  });
});