document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const firstname = urlParams.get('firstname');
    if (firstname) {
      document.getElementById('playerName').textContent = firstname.toLowerCase();
    }
    console.log(`Player name: ${firstname} loaded from URL query string`);
});
  