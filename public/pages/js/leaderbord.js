// Example JavaScript snippet for fetching and displaying leaderboard data
fetch('/leaderboard')
    .then(response => response.json())
    .then(data => {
        const leaderboardElement = document.getElementById('leaderboard');
        const list = data.map((item, index) => `<div>${index + 1}. ${item.firstname} ${item.lastname} - Attempts: ${item.best_attempts}, Time: ${item.best_time}</div>`);
        leaderboardElement.innerHTML = list.join('');
    })
    .catch(error => console.error('Error:', error));
