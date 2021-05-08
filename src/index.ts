import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import {config as dotenv} from 'dotenv';

//Router
import UserRoute from './routes/UserRoute';
import AuthRoute from './routes/AuthRoute';
import TodoRoute from './routes/TodoRoute';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet())
  }

  protected routes():void {
    this.app.route("/").get((req:Request, res: Response) => {
      res.send("Routing with typescript")
    });

    this.app.use("/api/v1/users", UserRoute);
    this.app.use("/api/v1/auth", AuthRoute);
    this.app.use("/api/v1/todos", TodoRoute);
  }
}

const port:number = 200;
const app = new App().app;
app.listen(port, () => {
  console.log(`Run application with port ${port}`);
});