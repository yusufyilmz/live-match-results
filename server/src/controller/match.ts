import * as express from 'express';
import Controller from './controller';
import matchModel from '../model/match';
import playerModel from '../model/player';
import MatchNotFoundException from '../exceptions/matchNotFoundException';
import MatchNotCreatedException from '../exceptions/matchNotCreatedException';
import validationMiddleware from '../middlewares/validation';
import MatchCreateDto from '../validation/matchCreate';
import Observable from '../observer';
import { EloRating } from '../services/eloRating';
import Player from 'interfaces/player';

export default class MatchController implements Controller {
  public path = '/api/matches';
  private match = matchModel;
  private player = playerModel;
  private observer: Observable;
  private eloRatingService: EloRating;

  public router = express.Router();

  constructor(observer: Observable, service: EloRating) {
    this.observer = observer;
    this.eloRatingService = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllMatches);
    this.router.get(`${this.path}/:id`, this.getMatchById);
    this.router.post(this.path, validationMiddleware(MatchCreateDto), this.createMatch);
    this.router.delete(this.path, this.remove);
  }

  private getAllMatches = async (request: express.Request, response: express.Response) => {
    const matches = await this.match.find().populate('players');
    response.send(matches);
  }

  private getMatchById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    const id = request.params.id;

    try {
      const player = await this.match.findById(id);
      response.send(player);
    } catch (e) {
      next(new MatchNotFoundException(id));
    }
  }

  private createMatch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    const matchData: MatchCreateDto = request.body;
    const update = { expire: new Date() };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const { players, createdAt, id } = matchData;

    try {

      const playerSavePromises = players.map((playerName: string) =>
        this.player.findOneAndUpdate({ name: playerName }, update, options));
      const playersWithRatings = await Promise.all(playerSavePromises);

      const playersWithUpdatedRatings =
        this.eloRatingService.calculateRatings(playersWithRatings);

      const playerUpdatePromises = playersWithUpdatedRatings.map((player: any) => player.save());
      const updatedPlayers = await Promise.all(playerUpdatePromises);

      const createdMatch = new this.match({ createdAt, players: updatedPlayers });
      const savedMatch = await createdMatch.save();
      await savedMatch.populate('players').execPopulate();

      this.observer.update(id, savedMatch);

      response.send(savedMatch);

    } catch (e) {
      next(new MatchNotCreatedException());
    }
  }

  private remove = async (request: express.Request, response: express.Response) => {
    const player = await this.match.remove({});
    response.send(player);
  }
}