"use strict";

const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const clearButton = document.querySelector(".search__button-clear-all");
const resultData = document.querySelector("ul");

let notification = document.createElement("li");
let newLi = document.createElement("li");
let breedsData;
let resolve;
let allLi;
let breedImages = document.querySelectorAll(".hidden");
searchInput.focus();
const getBreedData = async () => {
  try {
    resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    breedsData = resolve.data;
    // console.log(breedsData);

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
    }

    for (let i = 0; i < allLi.length; i++) {
      allLi[i].addEventListener("click", toggleImage);
    }
  } catch (error) {
    notification = document.createElement("li");
    notification.append(
      " Not found. Something went wrong. Please try again later"
    );
    resultData.append(notification);
  }
};

//TOGGLE IMAGES, IF A USER CLICK ON li, IT SHOWS THE IMAGE, iF A USER CLICKS ANOTHER li, THE LAST ONE CHOSEN li HIDE THE IMAGE
const toggleImage = function () {
  for (let i = 0; i < allLi.length; i++) {
    allLi[i].lastElementChild.classList.remove("result__breedImage");
  }
  this.lastElementChild.classList.add("result__breedImage");
};

//FETCH THE DATA FROM THE API ON WINDOW LOAD WITH THE getBreedData FUNCTION
window.addEventListener("load", getBreedData);

//FETCH THE DATA BASED ON INPUT SEARCH AND INPUT VALIDATION
const findBreed = async () => {
  resultData.innerHTML = "";
  notification = document.createElement("li");
  newLi = document.createElement("li");

  try {
    resolve = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchInput.value}`
    );
    breedsData = resolve.data;

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
      // breedImages = document.querySelectorAll(".hidden");
      for (let i = 0; i < allLi.length; i++) {
        allLi[i].addEventListener("click", toggleImage);
        console.log(allLi[i]);
      }
    }

    if (breedsData.length === 0) {
      searchInput.value = "";
    }

    notification.classList.add("notification");
    notification.textContent = "Nothing found. Please try again";
    resultData.append(notification);
    searchInput.focus();
  } catch (error) {
    notification = document.createElement("li");
    notification.append(
      "Not found. Something went wrong. Please try again later."
    );
    console.log(
      " Not found. Something went wrong. Please try again later.",
      error
    );
    resultData.append(notification);
  }
};

searchButton.addEventListener("click", findBreed);

//TRIGGER BUTTON CLICK ON THE ENTER KEY IN SEARCH INPUT
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    findBreed();
  }
});

//CLEAR THE RESULT DATA
clearButton.addEventListener("click", function () {
  resultData.innerHTML = "";
  getBreedData();
  searchInput.focus();
  searchInput.value = "";
});
