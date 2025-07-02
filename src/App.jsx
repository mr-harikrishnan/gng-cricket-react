import { useEffect, useState } from "react";
import TeamScore from "./Component/TeamScore";
import ScoreBoard from "./Component/ScoreBoard";

function App() {
  const [teamScores, setTeamScores] = useState([[], []]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentBall, setCurrentBall] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState(null);
  const [startBtn, setStartBtn] = useState(false);

  function hideStartBtn() {
    setStartBtn(true);
  }

  useEffect(() => {
    let interval;

    if (gameStarted === true && timer > 0) {
      interval = setInterval(() => {
        setTimer(function (prev) {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    return function () {
      clearInterval(interval);
    };
  }, [gameStarted]);

  function handleStart() {
    setGameStarted(true);
  }

  function handleHit() {
    if (gameStarted === false) {
      return;
    }

    if (currentPlayer >= 10) {
      return;
    }

    if (timer <= 0) {
      return;
    }

    const run = Math.floor(Math.random() * 7);
    const scoresCopy = [...teamScores];
    const team = currentTeam;

    if (!scoresCopy[team][currentPlayer]) {
      scoresCopy[team][currentPlayer] = [];
    }

    scoresCopy[team][currentPlayer].push(run);
    setTeamScores(scoresCopy);

    if (run === 0 || currentBall >= 5) {
      if ((currentPlayer + 1) >= 10) {
        if (currentTeam === 0) {
          setCurrentTeam(1);
          setCurrentPlayer(0);
          setCurrentBall(0);
          setTimer(60);
          return;
        } else {
          setGameStarted(false);
          return;
        }
      }

      setCurrentPlayer(function (prev) {
        return prev + 1;
      });

      setCurrentBall(0);
    } else {
      setCurrentBall(function (prev) {
        return prev + 1;
      });
    }
  }

  function handleGenerateResult() {
    const totals = teamScores.map(function (team) {
      return team.reduce(function (acc, player) {
        return acc + player.reduce(function (a, b) {
          return a + b;
        }, 0);
      }, 0);
    });

    const allPlayers = teamScores.map(function (team, teamIndex) {
      return team.map(function (player, playerIndex) {
        return {
          team: teamIndex + 1,
          player: playerIndex + 1,
          score: player.reduce(function (a, b) {
            return a + b;
          }, 0)
        };
      });
    }).flat();

    const bestPlayer = allPlayers.reduce(function (max, curr) {
      if (curr.score > max.score) {
        return curr;
      } else {
        return max;
      }
    }, { score: 0 });

    let winner;
    if (totals[0] > totals[1]) {
      winner = 1;
    } else if (totals[1] > totals[0]) {
      winner = 2;
    } else {
      winner = "Draw";
    }

    setResult({
      winner: winner,
      bestPlayer: bestPlayer
    });
  }

  // UI Text replacements (no ternary)
  let winnerText = "";
  if (result) {
    if (result.winner === "Draw") {
      winnerText = "Match Draw";
    } else {
      winnerText = "Team " + result.winner;
    }
  }

  let motm = "";
  if (result) {
    motm = "Team " + result.bestPlayer.team + " Player " + result.bestPlayer.player;
  }

  let startButtonClass = "bg-blue-600 text-white px-4 py-1.5 rounded-md text-base font-medium transition";
  if (startBtn === true) {
    startButtonClass = "hidden hover:bg-blue-700 bg-blue-600 text-white px-4 py-1.5 rounded-md text-base font-medium transition";
  }

  return (
    <div className="min-h-screen bg-[#EAEFEF] text-white font-sans">
      <div>
        <div className="bg-[#333446] py-5 shadow-md">
          <h1 className="text-3xl text-center font-semibold font-serif tracking-wide">
            CRICKET SCOREBOARD
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-around items-center gap-10 py-4">
          <TeamScore
            teamNumber={1}
            team={0}
            scores={teamScores[0]}
            onHit={handleHit}
            currentTeam={currentTeam}
          />
          <div className="bg-[#B8CFCE] text-white px-10 py-4 rounded-md shadow-md text-center">
            <h2 className="text-xl font-serif font-bold mb-2">TIMER</h2>
            <p className="text-4xl font-bold">{timer}</p>
          </div>
          <TeamScore
            teamNumber={2}
            team={1}
            scores={teamScores[1]}
            onHit={handleHit}
            currentTeam={currentTeam}
          />
        </div>

        <div className="flex justify-around flex-col lg:flex-row">
          <ScoreBoard team={1} scores={teamScores[0]} />

          <div className="p-6 flex items-center flex-col gap-2 order-1">
            <button
              onClick={handleGenerateResult}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-base font-medium hover:bg-blue-700 transition"
            >
              GENERATE RESULT
            </button>
            <h1 className="text-[#333446] font-bold text-xl mt-2 font-serif">MATCH WON BY</h1>
            <p className="text-[#333446] font-bold text-2xl mt-2 font-serif">{winnerText}</p>
            <h1 className="text-[#333446] font-bold text-xl mt-2 font-serif">MAN OF THE MATCH</h1>
            <p className="text-[#333446] font-bold text-2xl mt-2 font-serif">{motm}</p>
            <button
              onClick={function () {
                handleStart();
                hideStartBtn();
              }}
              className={startButtonClass}
              disabled={gameStarted}
            >
              START
            </button>
          </div>

          <ScoreBoard team={2} scores={teamScores[1]} />
        </div>
      </div>
    </div>
  );
}

export default App;
