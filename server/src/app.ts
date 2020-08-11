import * as express from 'express';
import * as socketIo from 'socket.io';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import Controller from './controller/controller';
import errorMiddleware from './middlewares/error';
import Observable from './observer';
import { createServer , Server} from 'http';

export enum ChatEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message'
}

export default class App {
  public app: express.Application;
  public port: number;
  private server: Server;
  private io: socketIo.Server;
  public observer: Observable;

  constructor(observer: Observable, port: number) {
    this.app = express();
    this.port = port;
    this.server = createServer(this.app);
    this.observer = observer;

    this.useCors();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
    this.initSocket();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initSocket (): void {
    this.io = socketIo(this.server);
  }

  public initializeSocket(observer: Observable) {
    this.server = createServer(this.app);
  }

  private useCors() {
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;

    const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}?retryWrites=true&w=majority`;

    const config =  {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false ,
      useCreateIndex: true };

    mongoose.connect(url, config);

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
      process.exit(1);
    });
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });

    this.io.on(ChatEvent.CONNECT, (socket: socketIo.Socket) => {

      this.observer.attach({ socket, id: socket.handshake.query.id });

      socket.on(ChatEvent.MESSAGE, (m: any) => {
        this.io.emit('message', m);
      });

      socket.on(ChatEvent.DISCONNECT, () => {
        this.observer.detach({ socket, id: socket.handshake.query.id });
      });
    });
  }
}
