import HttpException from './httpException';

class PlayerNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Player with number ${id}, is not found `);
  }
}

export default PlayerNotFoundException;
