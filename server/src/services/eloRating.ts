export interface EloRating {
  calculateRatings: (users: any) => any;
}

class EloRatingService {

  K: number;

  constructor(K: number) {
    this.K = K;
  }
  probability(winnerRating: number, loserRating: number): number {
    return 1.0 * 1.0 / (1 + 1.0 * (Math.pow(10, 1.0 * (winnerRating - loserRating) / 400)));
  }

  calculateRatings = (users: any[]): any[] => {

    const [winner, ...losers] = users;

    let winnerRatingDifference = 0 ;

    const updatedLosers =  losers.map((loser: any, i: number) => {

      const winnerProbabilirt = this.probability(winner.rating, loser.rating);
      const loserProbability = this.probability(loser.rating, winner.rating);
      const winnerRating = winner.rating + this.K * (1 - winnerProbabilirt);
      const loserRating = loser.rating + this.K * (0 - loserProbability);
      winnerRatingDifference += (winnerRating - winner.rating);

      loser.rating = loserRating;

      return loser;
    });

    winner.rating += winnerRatingDifference;

    return [winner, ...updatedLosers];

  }
}

export default EloRatingService;
