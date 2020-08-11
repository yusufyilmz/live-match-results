import * as express from 'express';
import Controller from './controller';
import Player from '../interfaces/player';
import playerModel from '../model/player';
import PlayerNotFoundException from '../exceptions/playerNotFoundException';

export default class PlayerController implements Controller {
  public path = '/api/players';
  private player = playerModel;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPlayers);
    this.router.get(`${this.path}/:id`, this.getPlayerById);
    this.router.delete(this.path, this.remove);
  }

  private getAllPlayers = async (request: express.Request, response: express.Response) => {
    const playeres: Player[] = await this.player.find();
    response.send(playeres);
  }

  private getPlayerById = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction) => {
    const id = request.params.id;

    try {
      const player = await this.player.findById(id);
      response.send(player);
    } catch (e) {
      next(new PlayerNotFoundException(id));
    }
  }

  private remove = async (request: express.Request, response: express.Response) => {
    const player = await this.player.remove({});
    response.send(player);
  }
}
