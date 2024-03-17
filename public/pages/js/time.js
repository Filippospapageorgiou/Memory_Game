function initialTime() {
    let seconds = 0;
    let minutes = 0;
    let secondsText;
    let minutesText;
    

    function CalculateTime() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        // Format seconds and minutes with leading zeros
        secondsText = seconds < 10 ? '0' + seconds : seconds;
        minutesText = minutes < 10 ? '0' + minutes : minutes;

        // Update the display
        document.querySelector("#seconds").innerText = secondsText;
        document.querySelector("#minutes").innerText = minutesText;
    }
    clearInterval(chronometro);
    chronometro = setInterval(CalculateTime, 1000);
}
