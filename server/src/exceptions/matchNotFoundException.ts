import HttpException from './httpException';

class MatchNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Match with ${id} is not found `);
  }
}

export default MatchNotFoundException;
