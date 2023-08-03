const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    map.on("click", (mapE) => {
      mapEvent = mapE;
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputDistance.value =
    inputCadence.value =
    inputDuration.value =
    inputElevation.value =
      "";

  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxwidth: 250,
        minwidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      }).setContent("Workout")
    )
    .openPopup();
});

inputType.addEventListener("change", () => {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
