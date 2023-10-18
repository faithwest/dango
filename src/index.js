document.addEventListener("DOMContentLoaded", () => {
    // Function to display movie details when a movie is clicked
    function displayMovieDetails(movieId) {
      fetch(`http://localhost:3000/films/${movieId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Movie not found");
          }
          return response.json();
        })
        .then((movie) => {
          document.getElementById("movie-poster").src = movie.poster;
          document.getElementById("movie-title").textContent = `Title: ${movie.title}`;
          document.getElementById("movie-runtime").textContent = `Runtime: ${movie.runtime} minutes`;
          document.getElementById("movie-showtime").textContent = `Showtime: ${movie.showtime}`;
  
          // Calculate available tickets
          const availableTickets = movie.capacity - movie.tickets_sold;
          const ticketsElement = document.getElementById("movie-tickets");
          ticketsElement.textContent = availableTickets > 0 ? `Available Tickets: ${availableTickets}` : "Sold Out";
  
          // Create a "Buy Ticket" button
          const buyButton = document.getElementById("buy-button");
          buyButton.style.display = availableTickets > 0 ? "block" : "none";
          buyButton.addEventListener("click", () => {
            if (availableTickets > 0) {
              alert(`You've purchased a ticket for ${movie.title}!`);
            } else {
              alert("This movie is sold out.");
            }
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  
    // Add click event listeners to movie list items
    document.querySelectorAll(".movie-list li").forEach((movieItem) => {
      movieItem.addEventListener("click", () => {
        const movieId = `movie-${movieItem.id}`;
        displayMovieDetails(movieId);
      });
    });
  
    // Initialize the display with the first movie
    displayMovieDetails("movie-1");
  });
  