function ScoreBoard({ team, scores }) {
    return (
        <div className="border-black w-max order-2 lg:order-1">
            <div className="text-black border ml-4 my-2 text-center bg-[#B8CFCE] rounded-lg">
                TEAM {team} SCORE BOARD
            </div>
            <div className="border p-1 border-black w-max ml-4 rounded-lg">
                <table>
                    <thead>
                        <tr className="text-black flex gap-1">
                            <th className="border p-1 h-7 w-24">PLAYERS</th>
                            {[...Array(6)].map((_, i) => (
                                <th key={i} className="border p-1 h-7 w-7">B{i + 1}</th>
                            ))}
                            <th className="border p-1 h-7 w-20">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {[...Array(10)].map((_, i) => {
                            const player = scores[i] || [];
                            const total = player.reduce((a, b) => a + b, 0);
                            return (
                                <tr key={i} className="flex mt-1 gap-1">
                                    <th className="border p-1 h-7 w-24">PLAYER {i + 1}</th>
                                    {[...Array(6)].map((_, j) => (
                                        <td key={j} className="border p-1 h-7 w-7">
                                            {player[j] !== undefined ? player[j] : ""}
                                        </td>
                                    ))}
                                    <td className="border p-1 h-7 w-20">{total}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ScoreBoard;
