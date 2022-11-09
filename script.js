"use strict";

const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const resultData = document.querySelector("ul");
let notification = document.createElement("li");
let newLi;
let data;
const arrayOfBreeds = [];

const getData = async () => {
  try {
    const resolve = await axios.get("https://api.thedogapi.com/v1/breeds");
    data = resolve.data;
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      newLi = document.createElement("li");
      newLi.classList.add("result");
      newLi.append(data[i].name);
      resultData.append(newLi);
      arrayOfBreeds.push(data[i].name);
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

//INPUT SEARCH WITH THE findBreed FUNCTION
searchInput.addEventListener("input", findBreed);

function findBreed() {
  resultData.innerHTML = "";
  notification = document.createElement("li");
  for (let i = 0; i < arrayOfBreeds.length; i++) {
    if (
      arrayOfBreeds[i]
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) &&
      !(searchInput.value === " ")
    ) {
      notification.style.display = "none";
      newLi = document.createElement("li");
      newLi.style.display = "block";
      newLi.classList.add("result");
      newLi.append(arrayOfBreeds[i], i);
      resultData.append(newLi);
    }

    notification.classList.add("notification");
    notification.textContent = "Nothing found. Please try again";
    resultData.append(notification);
  }
}
