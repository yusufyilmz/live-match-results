export interface EloRating {
  calculateRatings: (users: any []) => any [];
}

class EloRatingService {

  K: number;

  constructor(K: number) {
    this.K = K;
  }
  probability(rating: number): number {
    return Math.pow(10.0, (rating / 400));
  }

  calculateRatings = (users: any []): any [] => {

    let Q:number = 0.0;

    users.forEach((user: any, i: number) => {
      Q += this.probability(user.rating);
    });

    return users.map((user: any, i: number) => {

      const expected = this.probability(user.rating) / Q;

      let actualScore = 0;
      if (i === 0) {
        actualScore = 1;
      } else {
        actualScore = 0;
      }

      const newRating = Math.round(user.rating + this.K * (actualScore - expected));
      user.rating = newRating;

      return user;
    });
  }
}

export default EloRatingService;
