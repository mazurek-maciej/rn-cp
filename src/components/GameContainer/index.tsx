import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storePeopleCardsAction } from "../../store/peopleCards/actions"
import { getStarshipAction } from "../../store/starships/actions"

import { GameType } from "../../store/models/GameType"
import { RootState } from "../../store/state"

import PlayerCard from "../PlayerCard"
import { Button, Grid, Typography } from "@material-ui/core"
import CasinoIcon from '@material-ui/icons/Casino';

import playerLeftAvatar from '../../assets/images/playerOneAvatar.png';
import playerRightAvatar from '../../assets/images/playerTwoAvatar.png';


const GameContainer = () => {
  const [hasStartedGame, setHasStartedGame] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { leftCard: leftPeopleCard, rightCard: rightPeopleCard, error } = useSelector((state: RootState) => state.peopleCards)
  const { leftCard: leftStarshipCard, rightCard: rightStarshipCard, status: starshipStatus } = useSelector((state: RootState) => state.starship)
  const { leftPlayer, rightPlayer, isDraw, winnerId, gameType } = useSelector((state: RootState) => state.game)
  const { status: peopleStatus } = useSelector((state: RootState) => state.people)

  const dispatchGetPeople = () => dispatch(storePeopleCardsAction());
  const dispatchGetStarship = () => dispatch(getStarshipAction());

  const handleDispatchGameType = () => {
    !hasStartedGame && setHasStartedGame(true);

    if (gameType === GameType.people) {
      return dispatchGetPeople()
    }
    return dispatchGetStarship()
  }

  const renderPeopleCards = () => {
    return gameType === GameType.people ? (
      <>
        <Grid item xs={3}>
          <PlayerCard
            player={leftPlayer}
            avatar={playerLeftAvatar}
            isWinner={leftPlayer.id === winnerId}
            gameType={gameType}
            status={peopleStatus}
            people={leftPeopleCard}
          />
        </Grid>

        <Grid item xs={3}>
        <PlayerCard
            player={rightPlayer}
            avatar={playerRightAvatar}
            isWinner={rightPlayer.id === winnerId}
            gameType={gameType}
            status={peopleStatus}
            people={rightPeopleCard}
          />
        </Grid>
      </>
    ) : null
  }

  const renderStarshipCards = () => {
    return gameType === GameType.starships ? (
      <>
        <Grid item xs={3}>
          <PlayerCard
            player={leftPlayer}
            avatar={playerLeftAvatar}
            isWinner={leftPlayer.id === winnerId}
            gameType={gameType}
            status={starshipStatus}
            starship={leftStarshipCard}
          />
        </Grid>

        <Grid item xs={3}>
          <PlayerCard
            player={rightPlayer}
            avatar={playerRightAvatar}
            isWinner={rightPlayer.id === winnerId}
            gameType={gameType}
            status={starshipStatus}
            starship={rightStarshipCard}
          />
        </Grid>
      </>
    ) : null
  }

  const renderStartGameInfo = () => (
    hasStartedGame ? null : <Typography variant="subtitle1">To start the game press roll button</Typography>
  )

  return (
    <>
      <Grid container justify="center" spacing={3}>
        {renderPeopleCards()}
        {renderStarshipCards()}
      </Grid>

      <Grid item xs>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <Button
              variant={'outlined'}
              size={'large'}
              onClick={handleDispatchGameType}
              endIcon={<CasinoIcon/>}
            >ROLL</Button>
          </Grid>

          <Grid item>
            {renderStartGameInfo()}
          </Grid>

          <Grid item>
            {isDraw ? <Typography variant="h4">DRAW</Typography> : null}
          </Grid>
          
          {error ? <Typography variant="subtitle1">{error}</Typography> : null}
        </Grid>
      </Grid>
    </>
  )
}

export default GameContainer