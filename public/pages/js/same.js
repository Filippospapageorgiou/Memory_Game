function same(TheCards){ setTimeout(() => {
    TheCards.forEach(function(element){
      element.classList.add("accurate");
    });
    },1000);
  }