function error(TheCards) {
  // Start the shake animation on both cards
  TheCards.forEach(function(element) {
    element.classList.add("error");
  });

  // Wait for the animation to complete before flipping the cards back
  setTimeout(function() {
    TheCards.forEach(function(element) {
      // Remove the 'error' class
      element.classList.remove("error");
      // Remove the 'discover' class to flip the cards back
      element.classList.remove("discover");
    });
  }, 1000); // Timeout matches the animation duration
}
