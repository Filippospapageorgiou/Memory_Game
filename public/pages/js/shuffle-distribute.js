function shuffleCards() {
    var result;
    result = totalCards.sort(function() {
      return 0.5 - Math.random();
    });
    return result;
  }
  
  function distributeCards() {
    var table = document.querySelector("#table");
    var tableShuffles = shuffleCards();
    table.innerHTML = "";
  
    tableShuffles.forEach(function(element) {
      var card = document.createElement("div");
  
      card.innerHTML =
        "<div class='card' data-value="+element+" >" +
        "<div class='card__content'>" +
        element +
        "</div>" +
        "</div>";
  
      table.appendChild(card);
    });
  }
  