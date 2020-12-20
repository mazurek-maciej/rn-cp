import { handleActions } from "redux-actions";
import { GameType } from "../../models/GameType";
import { ACTION_TYPE, GameActionPayload, GameSwitchGameTypeActionPayload } from "../actions/types";
import { GameState } from "./types";

export const initialState: GameState = {
  leftPlayer: {
    id: 1,
    name: 'Dathomirian',
    score: 0
  },
  rightPlayer: {
    id: 2,
    name: 'Wookie',
    score: 0
  },
  gameType: GameType.starships,
  winnerId: undefined
}

export const gameReducer = handleActions<GameState, GameActionPayload>({
  [ACTION_TYPE.SCORE_LEFT_PLAYER]: (state) => ({
    ...state,
    leftPlayer: {
      ...state.leftPlayer,
      score: state.leftPlayer.score + 1
    },
    winnerId: 1,
    isDraw: false
  }),
  [ACTION_TYPE.SCORE_RIGHT_PLAYER]: (state) => ({
    ...state,
    rightPlayer: {
      ...state.rightPlayer,
      score: state.rightPlayer.score + 1
    },
    winnerId: 2,
    isDraw: false
  }),
  [ACTION_TYPE.GAME_DRAW]: (state) => ({
    ...state,
    winnerId: undefined,
    isDraw: true
  }),
  [ACTION_TYPE.SWITCH_GAME_TYPE]: (state, action) => ({
    ...initialState,
    gameType: (action.payload as GameSwitchGameTypeActionPayload).type
  })
}, {...initialState})