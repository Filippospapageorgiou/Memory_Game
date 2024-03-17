function initial(){
  
  attempts=0;
  distributeCards();
  document.querySelector("#mov").innerHTML = "00";
  document.querySelector("#feedback").classList.remove("visible");

  document.querySelectorAll(".card").forEach(function(elemento) {
   elemento.addEventListener("click",discover);
  });
  initialTime();
}

initial();
