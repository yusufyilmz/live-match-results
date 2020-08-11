import * as mongoose from 'mongoose';
import Player from '../interfaces/player';

const playerSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    unique: true
  },
  rating: {
    type: Number,
    default: 0
}
});

const playerModel = mongoose.model<Player & mongoose.Document>('Player', playerSchema);

export default playerModel;
