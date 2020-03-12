const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const button = document.querySelector("button");
let ticketPrice = +movieSelect.value;

populateUI();

function updateSelectedCount() {
  ticketPrice = movieSelect.value;
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * +ticketPrice;
}

function purchaseSeats() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  selectedSeats.forEach(seat => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
  });
  const occupiedSeats = document.querySelectorAll(".row .seat.occupied");
  const occupiedIndex = [...occupiedSeats].map(seat =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("occupiedSeats", JSON.stringify(occupiedIndex));
  updateSelectedCount();
}

function clearSeats() {
  seats.forEach(seat => {
    seat.classList.remove("occupied");
    seat.classList.remove("selected");
  });
  localStorage.clear();
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);
  if (selectedSeats && selectedSeats.length) {
    seats.forEach((seat, idx) => {
      if (selectedSeats.indexOf(idx) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const occupiedSeats = JSON.parse(localStorage.getItem("occupiedSeats"));
  if (occupiedSeats && occupiedSeats.length) {
    occupiedSeats.forEach((seat, idx) => {
      seats.forEach((seat, idx) => {
        if (occupiedSeats.indexOf(idx) > -1) {
          seat.classList.add("occupied");
        }
      });
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null)
    movieSelect.selectedIndex = selectedMovieIndex;
  updateSelectedCount();
}

//Movie select Event
movieSelect.addEventListener("change", e => {
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat click Event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  } else if (e.target.innerText === "Submit") {
    purchaseSeats();
  } else if (e.target.innerText === "Clear") {
    clearSeats();
  }
});
