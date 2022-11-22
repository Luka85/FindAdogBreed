//*SELECTING ELEMENTS
export const searchInput = document.querySelector(".search__input");
export const searchButton = document.querySelector(".search__button");
const searchContent = document.querySelector(".search-content");
export const alert = document.createElement("div");
let notification;
let newLi;
let breedsData;
let resolve;
let allLi;

import { resultData, catchError, toggleImage, getBreedData } from "./script.js";

//*FETCH THE DATA BASED ON INPUT SEARCH AND INPUT VALIDATION
export const findBreed = async () => {
  resultData.innerHTML = "";
  notification = document.createElement("li");
  newLi = document.createElement("li");

  try {
    resolve = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchInput.value}`
    );
    breedsData = resolve.data;

    showSearchResult();
    if (searchInput.value === "" || searchInput.value === " ") {
      getBreedData();
      searchInput.value = "";
      alert.style.display = "block";
      alert.classList.add("alert");
      alert.textContent = "The input field can't be empty or blank! Try again.";
      searchContent.insertAdjacentElement("beforebegin", alert);
      console.log("PRAZNOO");
    } else {
      alert.style.display = "none";
      searchInput.focus();
      notification.classList.add("notification");
      notification.textContent = "Nothing found. Please try again";
      resultData.append(notification);
    }
  } catch (error) {
    catchError();
    console.log(error);
  }
};

// //*SHOW THE INPUT BREED SEARCH RESULTS TO NEW LI'S
const showSearchResult = function () {
  console.log(searchInput.value, searchInput.value.length);
  for (let i = 0; i < breedsData.length; i++) {
    notification.style.display = "none";
    newLi = document.createElement("li");
    newLi.classList.add("result");
    newLi.innerHTML = `<div class="result__num">${
      i + 1
    }</div><div class ="result__breedLink">${
      breedsData[i].name
    }</div><img class="hidden" src="https://cdn2.thedogapi.com/images/${
      breedsData[i].reference_image_id
    }.jpg" alt="Image of the ${breedsData[i].name}">`;
    resultData.append(newLi);
    allLi = document.querySelectorAll("li");
    searchInput.focus();

    //*TOGGLE IMAGE BASED ON li CLICK EVENT
    newLi.addEventListener("click", toggleImage);
  }
};

//*TRIGGER SEARCH BUTTON CLICK ON THE ENTER KEYDOWN EVENT IN SEARCH INPUT

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    findBreed();
  }
});

//*BREED SEARCH ON A SEARCH BUTTON CLICK EVENT
searchButton.addEventListener("click", findBreed);
