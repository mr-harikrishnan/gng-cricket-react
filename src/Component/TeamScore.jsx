function TeamScore({ teamNumber, team, scores, onHit, currentTeam }) {
    const total = scores.reduce((acc, p) => acc + (p?.reduce((a, b) => a + b, 0) || 0), 0);

    return (
        <div className="bg-[#7F8CAA] text-white px-6 py-4 rounded-md shadow-md text-center w-max">
            <h2 className="text-xl font-serif font-semibold mb-2">
                TEAM <span className="font-sans font-bold">{teamNumber}</span> SCORE
            </h2>
            <p className="text-3xl font-bold my-3">{total}</p>
            <button
                onClick={onHit}
                disabled={currentTeam !== team}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-base font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
                HIT
            </button>
        </div>
    );
}

export default TeamScore;
