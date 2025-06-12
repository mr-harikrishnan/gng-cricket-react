import TeamScore from "./Component/TeamScore";
import ScoreBoard from "./Component/ScoreBoard";

function App() {
    return (
        <div className="min-h-screen bg-[#EAEFEF] text-white font-sans ">

            <div>
                <div className="bg-[#333446] py-5 shadow-md">

                    <h1 className="text-3xl text-center font-semibold font-serif tracking-wide">
                        CRICKET SCOREBOARD
                    </h1>

                </div>

                <div className="flex flex-col md:flex-row justify-around items-center gap-10 py-4 ">


                    <TeamScore teamNumber={1} />


                    <div className="bg-[#B8CFCE] text-white px-10 py-4 rounded-md shadow-md text-center ">
                        <h2 className="text-xl font-serif font-bold mb-2">TIMER</h2>
                        <p className="text-4xl font-bold">60</p>
                    </div>


                    <TeamScore teamNumber={2} />
                </div>

                <div className="flex">

                    <ScoreBoard></ScoreBoard>
                    <ScoreBoard></ScoreBoard>

                    

                </div>
            </div>





        </div>
    );
}

export default App;
