
document.addEventListener("DOMContentLoaded", function () {
    function fetchMovieDetails(movieId) {
      fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(data => {
          const moviePoster = document.getElementById("movie-poster");
          const movieTitle = document.getElementById("movie-title");
          const movieRuntime = document.getElementById("movie-runtime");
          const movieShowtime = document.getElementById("movie-showtime");
          const availableTickets = document.getElementById("available-tickets");
  
          moviePoster.src = data.poster;
          movieTitle.textContent = data.title;
          movieRuntime.textContent = data.runtime;
          movieShowtime.textContent = data.showtime;
          availableTickets.textContent = data.capacity - data.tickets_sold;
        })
        .catch(error => console.log(`Error:`, error));
    }
  
    fetchMovieDetails(1);
  
    const movieListItems = document.querySelectorAll(".films li");
    movieListItems.forEach(item => {
      item.addEventListener("click", (event) => {
        if (event.target && event.target.nodeName === 'LI') {
          const movieId = event.target.id.replace('movie-', '');
          fetchMovieDetails(movieId);
        }
      });
    });
  
    const buyTicket = document.getElementById("buy-ticket");
    buyTicket.addEventListener("click", () => {
      const availableTickets = document.getElementById("available-tickets");
      const currentTickets = availableTickets.textContent;
      if (currentTickets > 0) {
        availableTickets.textContent = currentTickets - 1;
        alert("Congratulations! You have bought a ticket.");
      } else {
        alert("Sorry, no tickets left for this movie.");
      }
    });
  });
  