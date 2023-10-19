document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch and display movie details
    // Your code here
  function fetchMovieDetails(movieId) {
      fetch(`http://localhost:3000/films/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          // Update movie details elements with data
          const moviePoster = document.getElementById('movie-poster');
         const movieTitle = document.getElementById('movie-title');
           const movieRuntime =document.getElementById('movie-runtime');
         const movieShowtime = document.getElementById('movie-showtime');
          const availableTickets = document.getElementById('movie-tickets')
         
          moviePoster.src = data.poster;
                  movieTitle.textContent = data.title;
                  movieRuntime.textContent = data.runtime;
                  movieShowtime.textContent = data.showtime;
                  availableTickets.textContent = data.capacity - data.tickets_sold;
        })
        .catch(error => console.error('Error:', error));
      }
      fetchMovieDetails(1);
  // Add event listener for movie list
      const movieList =document.getElementById('films');
      movielist.addEventListener('click', (e) => {
          if (e.target && e.target.nodeName === 'LI') {
              const movieId = e.target.id.replace('movie-', '');
              fetchMovieDetails(movieId);
  
          }
      });
  
      // function to handle buytickets
      
      const buyButton =document.getElementById('buy-button');
      buyButton.addEventListener('click' ,() => {
      const availableTickets = document.getElementById('movie-tickets');
      const currenticket = parseInt(availableTickets.textContent);
      if (currenticket > 0) {
          availableTickets.textContent = currenticket - 1;
          alert('Ticket purchased!');
      }else{
        alert('sold out!');
      }
      });
    })
  