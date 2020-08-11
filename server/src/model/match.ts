import * as mongoose from 'mongoose';
import Match from '../interfaces/match';

const matchSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  players: [
    {
      ref: 'Player',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  createdAt: String,
});

const matchModel = mongoose.model<Match & mongoose.Document>('Match', matchSchema);

export default matchModel;
