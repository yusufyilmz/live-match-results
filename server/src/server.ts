import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnvironmentVariables';
import MatchController from './controller/match';
import PlayerController from './controller/player';
import Observable from './observer';
import EloRatingService from './services/eloRating';

validateEnv();

const K = Number(process.env.ELO_RATING_K_VALUE);
const eloRatingService = new EloRatingService(K);
const observer = new Observable();
const app = new App(
  observer,
  5000,
);
// app.initializeSocket(observer);

app.initializeControllers([
  new MatchController(observer, eloRatingService),
  new PlayerController()
]);

app.listen();
