import HttpException from './httpException';

class MatchNotCreatedException extends HttpException {
  constructor() {
    super(404, "Match couldn't be created");
  }
}

export default MatchNotCreatedException;
