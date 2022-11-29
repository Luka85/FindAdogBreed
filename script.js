"use strict";

import { showAllData, resultFetchBreed } from "./fetchData.js";
import { toggleImage } from "./toggleImage.js";
import { searchBreed } from "./search.js";
import { clearData } from "./clearData.js";

console.log("script");
//*SELECTING ELEMENTS
export const resultDataUl = document.querySelector("ul");
export const searchInput = document.querySelector(".search__input");

const searchButton = document.querySelector(".search__button");
const clearButton = document.querySelector(".search__button-clear-all");

//*FOCUS ON SEARCH INPUT
export const inputFocus = function (searchInput) {
  searchInput.focus();
};

inputFocus(searchInput);
//*ON WINDOW LOAD DISPLAY ALL THE DATA FROM THE showAllData FUNCTION

window.addEventListener("load", showAllData(resultFetchBreed, resultDataUl));

// const allLi = document.querySelectorAll(".result");
// console.log(allLi);

//*ON ul (closest li) CLICK EVENT TOGGLE IMAGES
resultDataUl.addEventListener("click", toggleImage);

searchButton.addEventListener("click", searchBreed);

//*TRIGGER SEARCH BUTTON CLICK ON THE ENTER KEYDOWN EVENT IN SEARCH INPUT

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBreed();
  }
});

clearButton.addEventListener("click", clearData);
