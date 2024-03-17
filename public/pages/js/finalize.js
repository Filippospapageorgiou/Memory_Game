function finalize(){
    clearInterval(chronometro);
    document.querySelector("#feedback").classList.add("visible");
    
    document.querySelector("main").classList.add("dimmed");
    const restartButton = document.getElementById('restartButton');

    const attempts = document.querySelector("#mov").innerText;
    const time = `${document.querySelector("#minutes").innerText}:${document.querySelector("#seconds").innerText}`;

    document.getElementById('Attempts-player').innerText= attempts;
    document.getElementById('Time-player').innerText= time;

    // Example: Extract firstname and lastname from the URL or another source
    const urlParams = new URLSearchParams(window.location.search);
    const firstname = urlParams.get('firstname');
    const lastname = urlParams.get('lastname');

    restartButton.addEventListener('click', () => {
        console.log("restart button clicked");
        initial();
        document.querySelector("#feedback").classList.remove("visible");
        document.querySelector("main").classList.remove("dimmed");
    });

    fetch('/game/end', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attempts, time ,firstname, lastname}),
    }).then(response => {
        if (response.ok) {
            console.log('Statys successfully updated');
        } else {
            console.log('Failed to update status');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
    
}