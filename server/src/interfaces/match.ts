import Player from './player';

interface Match {
  id: string;
  players: Player [];
  createdTime: string;
}

export default Match;
