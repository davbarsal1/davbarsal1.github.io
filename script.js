const tripDate = new Date("2027-07-16T00:00:00");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const messageElement = document.getElementById("message");

const showReservationButton = document.getElementById("show-reservation-btn");
const reservationModal = document.getElementById("reservation-modal");
const closeModalButton = document.getElementById("close-modal-btn");

function updateCountdown() {
  const now = new Date();
  const difference = tripDate - now;

  if (difference <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    messageElement.textContent = "¡Ha llegado el día! Nos vamos a Skopelos 🌊🇬🇷";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  daysElement.textContent = formatNumber(days);
  hoursElement.textContent = formatNumber(hours);
  minutesElement.textContent = formatNumber(minutes);
  secondsElement.textContent = formatNumber(seconds);
}

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

showReservationButton.addEventListener("click", () => {
  reservationModal.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  reservationModal.classList.add("hidden");
});

reservationModal.addEventListener("click", (event) => {
  if (event.target === reservationModal) {
    reservationModal.classList.add("hidden");
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
