function attemptsCalculator(){
    let attemptsText;
    attempts++;
    attemptsText=attempts;

    if(attempts<10)
    {
        attemptsText = '0' + attempts;
    }

    document.querySelector("#mov").innerText = attemptsText;
}