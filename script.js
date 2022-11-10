"use strict";

const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const resultData = document.querySelector("ul");
let notification = document.createElement("li");
let newLi;
let breedsData;
let resolve;

const getData = async () => {
  try {
    resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    breedsData = resolve.data;
    // console.log(breedsData);
    for (let i = 0; i < breedsData.length; i++) {
      newLi = document.createElement("li");
      newLi.classList.add("result");
      newLi.append(breedsData[i].name);
      resultData.append(newLi);
    }
  } catch (error) {
    notification = document.createElement("li");
    notification.append(
      " Not found. Something went wrong. Please try again later"
    );
    resultData.append(notification);
  }
};

//FETCH THE DATA FROM THE API ON WINDOW LOAD WITH THE getData FUNCTION
window.addEventListener("load", getData);

//FETCH THE DATA BASED ON INPUT SEARCH AND INPUT VALIDATION
const findBreed = async () => {
  resultData.innerHTML = "";
  notification = document.createElement("li");
  try {
    resolve = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchInput.value}`
    );
    breedsData = resolve.data;
    for (let i = 0; i < breedsData.length; i++) {
      notification.style.display = "none";
      newLi = document.createElement("li");
      newLi.style.display = "block";
      newLi.classList.add("result");
      newLi.append(breedsData[i].name);
      resultData.append(newLi);
      searchInput.focus();
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
    console.log(" Not found. Something went wrong. Please try again later.");
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
