function ScoreBoard() {
    return (<div className=" border-black w-max">
        <div className="text-black border ml-4 my-2 text-center bg-[#B8CFCE] rounded-lg">TEAM 1 SCORE BOARD</div>
        <div className="border p-1 border-black w-max ml-4 rounded-lg">
            <table className=" ">
                <thead>
                    <tr className="text-black flex gap-1 ">
                        <th className="border p-1 h-7 w-20">TEAM 1</th>
                        <th className="border p-1 h-7 w-7">B1</th>
                        <th className="border p-1 h-7 w-7">B2</th>
                        <th className="border p-1 h-7 w-7">B3</th>
                        <th className="border p-1 h-7 w-7">B4</th>
                        <th className="border p-1 h-7 w-7">B5</th>
                        <th className="border p-1 h-7 w-7">B6</th>
                        <th className="border p-1 h-7 w-20">TOTAL</th>
                    </tr>
                </thead>
                <tbody className="text-black  ">

                    {
                        Array.from({ length: 10 }).map((length, index) => {
                            return <tr className="flex  mt-1 gap-1">
                                <th className="border p-1 h-7 w-20 ">PLAYER</th>
                                <td className="border p-1 h-7 w-7"></td>
                                <td className="border p-1 h-7 w-7"></td>
                                <td className="border p-1 h-7 w-7"></td>
                                <td className="border p-1 h-7 w-7"></td>
                                <td className="border p-1 h-7 w-7"></td>
                                <td className="border p-1 h-7 w-7"></td>
                                <td className="border p-1 h-7 w-20"></td>
                                
                            </tr>
                        })
                    }

                </tbody>


            </table>


        </div>
    </div>
    )
}
export default ScoreBoard;