import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  'use strict';

// Selecting elements
  const player0EL = document.querySelector('.player--0')
  const player1EL = document.querySelector('.player--1')
  const score0EL = document.getElementById('score--0')
  const score1EL = document.getElementById('score--1')
  const current0EL = document.getElementById('current--0')
  const current1EL = document.getElementById('current--1')
  const diceEL = document.querySelector('.dice');
  const btnNew = document.querySelector('.btn--new')
  const btnRoll = document.querySelector('.btn--roll')
  const btnHold = document.querySelector('.btn--hold')

// Starting conditions

  let scores, currentScore, activePlayer, playing;
  const init = function () {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');

  }
  init();
  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active')
    player1EL.classList.toggle('player--active')
  }

// Rolling dice functionality
  btnRoll.addEventListener('click', function () {
    if (playing) {
      // 1. Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;
      // 2. Display a dice
      diceEL.classList.remove('hidden');
      diceEL.src = `dice-${dice}.png`

      // 3. Check for rolled 1: if true, switch to next player
      if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

      } else {
        // Switch to next player
        switchPlayer();
      }
    }
  })

  btnHold.addEventListener('click', function () {
    if (playing) {
      // 1. Add current score to active player`s score
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

      // 2. Check if score player`s score is >= 100
      if (scores[activePlayer] >= 100) {
        // Finish the game
        playing = false
        diceEL.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      } else {
        // Switch to the next player
        switchPlayer();
      }

    }
  })

  btnNew.addEventListener('click', init)


  return (
      <main>
        <section className="player player--0 player--active">
          <h2 className="name" id="name--0">Player 1</h2>
          <p className="score" id="score--0">43</p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--0">0</p>
          </div>
        </section>
        <section className="player player--1">
          <h2 className="name" id="name--1">Player 2</h2>
          <p className="score" id="score--1">24</p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--1">0</p>
          </div>
        </section>

        <img src="/images/dice-5.png" alt="Playing dice" className="dice" />
        <button className="btn btn--new">🔄 New game</button>
        <button className="btn btn--roll">🎲 Roll dice</button>
        <button className="btn btn--hold">📥 Hold</button>
      </main>
  )
}
