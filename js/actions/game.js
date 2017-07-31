import { wipeHand } from './cards';

export const startGame = () => ({
  type: 'GAME_START',
});

export const endingGame = () => ({
  type: 'GAME_ENDING',
});

export const endGame = () => (dispatch) => {
  dispatch(endingGame());
  dispatch(wipeHand());
  setTimeout(() => {
    dispatch({
      type: 'GAME_WINNER_IS',
      winner: Math.random() > 0.5 ? 'enemy' : 'player',
    });
  }, 3000);
};

export default endGame;
