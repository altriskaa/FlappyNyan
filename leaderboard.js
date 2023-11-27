window.addEventListener('load', async function() {
    
    try {
    const resp = await fetch("https://ets-pemrograman-web-f.cyclic.app/scores/score", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
        if(resp.ok){
            const data = await resp.json()
            let scoreData = data.data
            scoreData.sort((a, b) => b.score - a.score)
            const leaderboardBox = document.querySelector(".leaderboard-box");

            leaderboardBox.innerHTML = '';

            for (let index = 0; index < Math.min(3, scoreData.length); index++) {
                const user = scoreData[index];
                const leaderboardRow = document.createElement("div");
                leaderboardRow.classList.add("leaderboard-row");
                leaderboardRow.innerHTML = `
                    <p>${index + 1}</p>
                    <p>${user.nama}</p>
                    <p>${user.score}</p>
                `;
                leaderboardBox.appendChild(leaderboardRow);
            }
        }
        
    }
    catch(error) {
        console.error("An error occurred:", error);
    }
});