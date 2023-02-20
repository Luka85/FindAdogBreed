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

//*FOCUS ON SEARCH INPUT
export const inputFocus = function () {
  searchInput.focus();
};

inputFocus();

const resultFetchBreed = await fetchBreedData();

//*ON WINDOW LOAD DISPLAY ALL THE DATA FROM THE showAllData FUNCTION
window.addEventListener("load", showAllData(resultFetchBreed));

//*ON ul (closest li) CLICK EVENT TOGGLE IMAGES

resultDataUl.addEventListener("click", function (e) {
  const allLi = document.querySelectorAll(".result");
  toggleImage(e, allLi);
});

searchButton.addEventListener("click", function () {
  inputValidation(searchInput, resultFetchBreed);
});

//*TRIGGER SEARCH BUTTON CLICK ON THE ENTER KEYDOWN EVENT IN SEARCH INPUT
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    inputValidation(searchInput, resultFetchBreed);
  }
});

clearButton.addEventListener("click", function () {
  clearData(searchInput, inputFocus);
  showAllData(resultFetchBreed, resultDataUl);
});
