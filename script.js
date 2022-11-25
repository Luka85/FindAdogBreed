"use strict";
console.log("script");
//*SELECTING ELEMENTS
export const resultData = document.querySelector("ul");
export const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const clearButton = document.querySelector(".search__button-clear-all");

import { fetchBreedData, showAllData } from "./fetchData.js";

// //*FETCH THE DATA FROM THE API ON WINDOW LOAD WITH THE getBreedData FUNCTION

window.addEventListener("load", fetchBreedData(resultData));

searchInput.focus();

const resultFetchBreed = await fetchBreedData();
console.log(resultFetchBreed);

window.addEventListener("load", showAllData(resultFetchBreed, resultData));
