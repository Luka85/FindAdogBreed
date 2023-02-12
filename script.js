"use strict";

import { fetchBreedData, showAllData, clearData } from "./data.js";
import { toggleImage } from "./toggleImage.js";
import { inputValidation } from "./search.js";
console.log("script");
//*SELECTING ELEMENTS
export const resultDataUl = document.querySelector("ul");
export const searchInput = document.querySelector(".search__input");
export const notification = document.querySelector(".notification");
const searchButton = document.querySelector(".search__button");
const clearButton = document.querySelector(".search__button-clear-all");
// const newLi = document.querySelector("li");

//*FOCUS ON SEARCH INPUT
export const inputFocus = function () {
  searchInput.focus();
};

inputFocus();

export const resultFetchBreed = await fetchBreedData(
  resultDataUl,
  notification,
  searchInput
);

window.addEventListener(
  "load",
  fetchBreedData(resultDataUl, notification, searchInput)
);

//*ON WINDOW LOAD DISPLAY ALL THE DATA FROM THE showAllData FUNCTION
window.addEventListener("load", showAllData(resultFetchBreed, resultDataUl));

//*ON ul (closest li) CLICK EVENT TOGGLE IMAGES
const allLi = document.querySelectorAll(".result");

resultDataUl.addEventListener("click", function (e) {
  toggleImage(e, allLi);
});

searchButton.addEventListener("click", function () {
  inputValidation(searchInput, resultFetchBreed, notification, resultDataUl);
});

//*TRIGGER SEARCH BUTTON CLICK ON THE ENTER KEYDOWN EVENT IN SEARCH INPUT
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    inputValidation(searchInput, resultFetchBreed, notification, resultDataUl);
  }
});

clearButton.addEventListener("click", function () {
  clearData(searchInput, inputFocus);
  showAllData(resultFetchBreed, resultDataUl);
});
