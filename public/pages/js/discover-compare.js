function discover() {
  
    let discovered;
    let cardsRemainig;
    let totalDiscovers = document.querySelectorAll(".discover:not(.accurate)");
  
    console.log(this.getAttribute("class"));
    
    if(totalDiscovers.length>1){
      return ;
    }
    
    this.classList.add("discover");
  
    discovered = document.querySelectorAll(".discover:not(.accurate)");
    
    if(discovered.length < 2 ){
      return ;
    }

    compare(discovered);
    attemptsCalculator();
    cardsRemainig = document.querySelectorAll(".card:not(.accurate)");
    console.log(cardsRemainig.length);
    if(cardsRemainig.length === 2){
      setTimeout(finalize(),1000);
    }
}
  
function compare(CardDiscovered){
    
    if(CardDiscovered[0].dataset.value === CardDiscovered[1].dataset.value){
      same(CardDiscovered);
    }else{
      error(CardDiscovered);
    }
  
}