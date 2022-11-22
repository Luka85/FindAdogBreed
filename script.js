"use strict";

//*SELECTING ELEMENTS
const clearButton = document.querySelector(".search__button-clear-all");
export const resultData = document.querySelector("ul");
let notification;
let newLi;
let breedsData;
let resolve;
let allLi;

import { searchInput, alert } from "./search.js";

searchInput.focus();

export const getBreedData = async () => {
  // alert.textContent = "";
  try {
    resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    breedsData = resolve.data;

    console.log(breedsData);
    showAllData();
  } catch (error) {
    catchError();
    console.log(error);
  }
};

export const catchError = function () {
  notification = document.createElement("li");
  notification.append(
    " Not found. Something went wrong. Please try again later"
  );
  resultData.append(notification);
};

//*FETCH THE DATA FROM THE API ON WINDOW LOAD WITH THE getBreedData FUNCTION
window.addEventListener("load", getBreedData);

const showAllData = function () {
  for (let i = 0; i < breedsData.length; i++) {
    newLi = document.createElement("li");
    allLi = document.querySelectorAll("li");
    newLi.classList.add("result");
    newLi.innerHTML = `<div class="result__num">${
      i + 1
    }</div><div class ="result__breedLink">${
      breedsData[i].name
    }</div><img class="hidden" src="${
      breedsData[i].image.url
    }" alt="Image of the ${breedsData[i].name}">`;
    resultData.append(newLi);
    //*TOGGLE IMAGE BASED ON li CLICK EVENT
    newLi.addEventListener("click", toggleImage);
  }
};

// //*TOGGLE IMAGES, IF A USER CLICKS ON li, IT SHOWS THE IMAGE, IF A USER CLICKS ANOTHER li, THE LAST ONE CHOSEN li HIDE THE IMAGE
export const toggleImage = function (e) {
  if (e.currentTarget.lastElementChild.classList.contains("show-image")) {
    e.currentTarget.lastElementChild.classList.remove("show-image");
  } else {
    for (let i = 0; i < allLi.length; i++) {
      allLi[i].lastElementChild.classList.remove("show-image");
    }
    e.currentTarget.lastElementChild.classList.add("show-image");
    console.log(e.currentTarget.lastElementChild);
  }
};

//*CLEAR THE RESULT DATA AND LOAD ALL DATA AGAIN
clearButton.addEventListener("click", function () {
  resultData.innerHTML = "";
  getBreedData();
  searchInput.focus();
  searchInput.value = "";
});
