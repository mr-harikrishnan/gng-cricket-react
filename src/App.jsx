import { useEffect, useState } from "react";
import TeamScore from "./Component/TeamScore";
import ScoreBoard from "./Component/ScoreBoard";

function App() {
    const [teamScores, setTeamScores] = useState([[], []]); // [ [ [], [], ... ], [ [], [], ... ] ]
    const [currentTeam, setCurrentTeam] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [currentBall, setCurrentBall] = useState(0);
    const [timer, setTimer] = useState(60);
    const [gameStarted, setGameStarted] = useState(false);
    const [result, setResult] = useState(null);
    const [startBtn,setStartBtn]=useState(false)

    const hideStartBtn=()=>{
        setStartBtn(true)
    }



    useEffect(() => {
        let interval;
        if (gameStarted && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted]);

    const handleStart = () => {
        setGameStarted(true);
    };

    const handleHit = () => {
        if (!gameStarted || currentPlayer >= 10 || timer <= 0) return;

        const run = Math.floor(Math.random() * 7); // 0 to 6
        const scoresCopy = [...teamScores];
        const team = currentTeam;

        if (!scoresCopy[team][currentPlayer]) scoresCopy[team][currentPlayer] = [];
        scoresCopy[team][currentPlayer].push(run);
        setTeamScores(scoresCopy);

        if (run === 0 || currentBall >= 5) {
            if (currentPlayer + 1 >= 10) {
                if (currentTeam === 0) {
                    // switch to team 2
                    setCurrentTeam(1);
                    setCurrentPlayer(0);
                    setCurrentBall(0);
                    setTimer(60); // restart timer
                    return;
                } else {
                    // match ends
                    setGameStarted(false);
                    return;
                }
            }
            setCurrentPlayer(prev => prev + 1);
            setCurrentBall(0);
        } else {
            setCurrentBall(prev => prev + 1);
        }
    };

    const handleGenerateResult = () => {
        const totals = teamScores.map(team =>
            team.reduce((acc, player) => acc + player.reduce((a, b) => a + b, 0), 0)
        );
        const allPlayers = teamScores.map((team, teamIndex) => {
            return team.map((player, playerIndex) => ({
                team: teamIndex + 1,
                player: playerIndex + 1,
                score: player.reduce((a, b) => a + b, 0),
            }));
        }).flat();
        const bestPlayer = allPlayers.reduce((max, curr) =>
            curr.score > max.score ? curr : max,
            { score: 0 }
        );
        const winner = totals[0] > totals[1] ? 1 : totals[1] > totals[0] ? 2 : "Draw";

        setResult({
            winner,
            bestPlayer,
        });
    };

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
                        <p className="text-[#333446] font-bold text-2xl mt-2 font-serif">
                            {result?.winner === "Draw" ? "Match Draw" : `Team ${result?.winner}`}
                        </p>
                        <h1 className="text-[#333446] font-bold text-xl mt-2 font-serif">MAN OF THE MATCH</h1>
                        <p className="text-[#333446] font-bold text-2xl mt-2 font-serif">
                            {result ? `Team ${result.bestPlayer.team} Player ${result.bestPlayer.player}` : ""}
                        </p>
                        <button
                            onClick={()=>{
                                handleStart()
                                hideStartBtn()
                            }}
                            
                            className={`${startBtn == true?"hidden hover:bg-blue-700" :""}bg-blue-600 text-white px-4 py-1.5 rounded-md text-base font-medium  transition`}
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
